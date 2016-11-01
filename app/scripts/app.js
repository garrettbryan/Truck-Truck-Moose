/*
This is the main file of Truck Truck Moose. You will find the app's main viewmodel and many of the functions used to manipulate the data within the viewmodel.
*/
var ViewModel = function() {
  this.map = {};

  this.user = new User();

  this.now = ko.observable(Date().toString());
  this.previousScreen = ko.observable('');
  this.currentScreen = ko.observable('');
  this.screenHistory = ko.observableArray();

  this.loginScreen = ko.observable(false); // Start empty
  this.signUpScreen = ko.observable(false);
  this.settingsScreen = ko.observable(false);
  this.destinationSelectionScreen = ko.observable(false);
  this.foodTruckScreen = ko.observable(false);
  this.orderScreen = ko.observable(false);
  this.confirmationScreen = ko.observable(false);
  this.arrivedScreen = ko.observable(false);
  this.thankYouScreen = ko.observable(false);

  this.showSettings = ko.observable(false);

  this.filter = ko.observable('');
  this.description = ko.observable('');

  this.meetups = ko.observableArray();
  this.prunedPossibleDestinations = ko.observableArray();
  this.prunedPossibleNames = ko.observableArray();
  this.selectedDestination = {};
  this.meetupMapBounds = {};
  this.meetupsAdded = false;

  this.truckFilter = ko.observable('');
  this.foodTrucks = ko.observableArray();
  this.prunedPossibleFoodTrucks = ko.observableArray();
  this.prunedPossibleFoodTruckNames = ko.observableArray();
  this.selectedTruck = {};
  this.selectedTruckName = ko.observable('');
  this.foodTrucksAdded = false;

  this.menu = ko.observableArray();

  this.order = ko.observableArray();
  this.orderTotal = ko.computed(function(){
    var subtotal = 0;
    this.order().forEach( function(item){
      subtotal += item.price();
    });
    return Number(subtotal.toFixed(2));
  }, this);

  this.puTime = ko.observable(moment(new Date(Date.now()+1000*60*15)));
  this.puPhrase = ko.observable('');


  this.noGoogleMaps = ko.observable(false);
  this.noGeoPosition = ko.observable(false);
  this.noMeetups = ko.observable(false);

  this.warning = ko.observable(false);
  this.warningMessages = ko.observableArray();


  this.meetupRequest = new MeetupRequest();
  this.foodTruckRequest = new FoodTruckRequest();

  this.radarMap = new WeatherUnderground();


  /*
  This is the major part of the app that controls the displayed screen.
  */
  this.currentScreen.subscribe(function(screen){
    switch(screen) {
        case 'login':
          this.showSettings(false);
          this.resetUser();
          this.turnOffScreens();
          this.loginScreen(true);
          this.getCurrentPosition();
            break;
        case 'signup':
          this.showSettings(false);
          this.user.localSave();
          this.turnOffScreens();
          this.signUpScreen(true);
            break;
        case 'settings':
          //this.showSettings(true);
          this.user.localSave();
          this.turnOffScreens();
          this.settingsScreen(true);
            break;
        case 'destination':
          this.showSettings(true);
          if(this.meetups() && !this.meetupsAdded){
            this.addMeetupsToMap();
            this.renderMeetups();
          } else if (this.meetups()){
            this.renderMeetups();
          }
          this.turnOffScreens();
          this.destinationSelectionScreen(true);
            break;
        case 'foodtruck':
          if(this.selectedDestination && this.user.begin() && this.user.end()){
            this.showSettings(true);
            this.description('');
            try {
              this.selectedDestination.keepChosen(this.map, this);
            }
            catch (err) {
            }
            if (!this.foodTrucksAdded){
              this.addFoodTrucksToMap(function(err){
                this.turnOffScreens();
                this.foodTruckScreen(true);
              }.bind(this));
            }
          }
            break;
        case 'order':
          if(this.selectedTruckName()){
            this.showSettings(true);
            this.description('');
            this.menu(this.selectedTruck.dailyMenu);
            this.turnOffScreens();
            this.orderScreen(true);
            this.selectedTruck.keepChosen(this.map, this);
          }
            break;
        case 'confirmation':
          if(this.order().length>0){
            this.showSettings(true);
            this.puPhrase(makePUPhrase());
            this.turnOffScreens();
            this.confirmationScreen(true);
          }
            break;
        case 'arrived':
          this.turnOffScreens();
          this.arrivedScreen(true);
            break;
        case 'thankyou':
          this.turnOffScreens();
          this.thankYouScreen(true);
            break;
        default:
    }
  }.bind(this));

  /*
  The food truck swiper view changes based on the filter. when a food truck is selected only the filtered foodtruck array is searched.
  */
  this.selectedTruckName.subscribe(function(name){
    this.prunedPossibleFoodTrucks().forEach(function(truck, index) {
      if (name === truck.name) {
        this.selectedTruck = this.prunedPossibleFoodTrucks()[index];
      }
    }.bind(this));
  }.bind(this));

  /*
  This is part of the meetup/final destination selection process. The filter updates the possible destinations, this subscription causes the map markers to update.
  */
  this.prunedPossibleDestinations.subscribe(function(destinations) {
    var self = this;

    this.meetups().forEach(function(meetup){
      if (meetup.marker) {
        meetup.marker.setVisible(false);
      }
      if(meetup.flightPath){
        meetup.flightPath.setMap(null);
      }
    });

    destinations.forEach(function(meetup, index){
      if (meetup.marker) {
        meetup.marker.setVisible(true);
      }
      if(meetup.flightPath){
        meetup.flightPath.setMap(this.map);
      }
    });

  }.bind(this));

  /*
  This is part of the Foodtruck selection process. The filter updates the possible foodtrucks, this subscription causes the map markers to update.
  */
  this.prunedPossibleFoodTrucks.subscribe(function(foodTrucks) {
    var self = this;

    this.foodTrucks().forEach(function(foodTruck){
      foodTruck.marker.setVisible(false);
      foodTruck.flightPaths.forEach( function (path){
          path.setMap(null);
        });
      if(foodTruck.flightPaths > 0){
        foodTruck.flightPaths.forEach( function (path){
          path.setMap(null);
        });
      }
    });

    foodTrucks.forEach(function(foodTruck, index){
      foodTruck.marker.setVisible(true);
      if(foodTruck.flightPaths > 0){
        foodTruck.flightPaths.forEach( function (path){
          path.setMap(this.map);
        });
      }
    });

  }.bind(this));

  /*
  used for testing the local save function. allows reseting of the local data.
  */
  this.resetUser = function() {
    //localStorage.setItem('MeetUpTruck', {});
    this.user.init(this.now());
    try{
    this.user.getLocalData();
    }
    catch(err){
    }
    //this.savelocally();
  }.bind(this);

  /* TODO
  update this so that users and easily navigate forward and backward through all the screens.
  */
  this.goBack = function() {
    this.currentScreen(this.screenHistory.pop());
  }.bind(this);

  /*
  special function to allow user to jump to the settings screen and come back to their last screen position in the app.
  */
  this.changeScreen = function(newScreen) {
    var screen;
    if (newScreen === 'last') {
      if (this.screenHistory()[this.screenHistory().length - 2] === 'signup'){
        screen = 'destination';
      } else {
        if(this.screenHistory()[this.screenHistory().length -1] !== 'settings') {
          screen = 'settings';
        } else {
          screen = this.screenHistory()[this.screenHistory().length - 2];
        }
      }
    } else if(newScreen === this.screenHistory()[this.screenHistory().length - 1]) {
      //double click
    } else {
      screen = newScreen;
    }

    if (screen) {
      this.screenHistory.push(screen);
      this.currentScreen(screen);
    }
  }.bind(this);

  /*
  clears all screens before turning on the next one.
  */
  this.turnOffScreens = function(){
    this.loginScreen(false);
    this.signUpScreen(false);
    this.settingsScreen(false);
    this.destinationSelectionScreen(false);
    this.foodTruckScreen(false);
    this.orderScreen(false);
    this.confirmationScreen(false);
    this.arrivedScreen(false);
    this.thankYouScreen(false);
  }.bind(this);


  /*TODO refactor to clarify move some code to the TTM Heroku API
    This function uses the function this.foodTruckRequest.getFoodTrucks which goes to the file ./models/foodtruck-model.js. The TTM api is called to get the 10 foodtruck objects. Then the local code generates the random variables such as stops, times, menus. Also Opportunity to merge similar functions regarding foodtrucks and meeup icons.
  */
  this.addFoodTrucksToMap = function(cb) {
    var err = null;

    //call foodtrucks that are around the selected destination
    this.foodTruckRequest.getFoodTrucks.call(this, function(err){
      this.map.fitBounds(new google.maps.LatLngBounds(google.maps.geometry.spherical.computeOffset(this.selectedDestination.marker.position, 5000, 225),google.maps.geometry.spherical.computeOffset(this.selectedDestination.marker.position, 5000, 45)));
      //fitBounds(bounds:LatLngBounds|LatLngBoundsLiteral)
      //LatLngBounds(sw?:LatLng|LatLngLiteral, ne?:LatLng|LatLngLiteral)

      //initailly add all foodtrucks to the list of pruned foodtrucks
      this.prunedPossibleFoodTrucks(this.foodTrucks());
      cb(err);
    }.bind(this));
  }.bind(this);


  this.renderMeetups = function() {
    this.meetups().forEach( function(meetup){
      meetup.render(this.map, this);
    }.bind(this));
    this.meetupsAdded = true;
  }.bind(this);

  /*
  addMeetupsToMap adjusts the bounds of the map so that all local meetups are displayed.
  */
  this.addMeetupsToMap = function() {
    //TODO adjust map boundaries so that all icons are within the viable portion of the map. with restpect to the swiper bar.
    var ne = this.map.getBounds().getNorthEast();
    var sw = this.map.getBounds().getSouthWest();

    var mainFormWidth = $('#main-form').outerWidth(true);
    var mainFormHeight = $('#main-form').outerHeight(true);
    var scale = 1 ;//<< this.map.getZoom();
    var projection = this.map.getProjection();
    var topRight = projection.fromLatLngToPoint(ne);
    var bottomLeft = projection.fromLatLngToPoint(sw);
    var newLatlng = projection.fromPointToLatLng(new google.maps.Point(
      mainFormWidth/scale + bottomLeft.x,
      mainFormHeight/scale + topRight.y));


    var latDiff = Math.abs(newLatlng.lat()-this.map.getBounds().getNorthEast().lat());


    if (this.meetups().length > 0){

      this.meetupMapBounds.max = {
        lat: -360,
        lng: -360
      };
      this.meetupMapBounds.min = {
        lat: 360,
        lng: 360
      };

      // determine if each meetup icon fits within the current map. If not then extend the boundaries
      this.meetups().forEach(function(meetup){
        if (typeof meetup.venue !== 'undefined'){
          var meetupLatLng = new google.maps.LatLng(meetup.venue.lat,meetup.venue.lon);
          //console.dir(google.maps);
          if (meetupLatLng && ( google.maps.geometry.spherical.computeDistanceBetween(this.user.position(),meetupLatLng) < 40000)){
            this.meetupMapBounds.max.lat =
              this.meetupMapBounds.max.lat > meetup.venue.lat ?
              this.meetupMapBounds.max.lat :
              meetup.venue.lat;
            this.meetupMapBounds.max.lng =
              this.meetupMapBounds.max.lng > meetup.venue.lon ?
              this.meetupMapBounds.max.lng :
              meetup.venue.lon;
            this.meetupMapBounds.min.lat =
              this.meetupMapBounds.min.lat < meetup.venue.lat ?
              this.meetupMapBounds.min.lat :
              meetup.venue.lat;
            this.meetupMapBounds.min.lng =
              this.meetupMapBounds.min.lng < meetup.venue.lon ?
              this.meetupMapBounds.min.lng :
              meetup.venue.lon;
          }
        }
      }.bind(this));

    }
  //$('#user-order').css('margin-top', $('.login').outerHeight(true)).css('height', $(window).height() - 50 - $('#main-form').outerHeight(true));


    //create a mapbounds object and apply it to the map.
    try {
      this.mapBounds = {
        north: this.meetupMapBounds.max.lat,
        south: this.meetupMapBounds.min.lat,
        east: this.meetupMapBounds.max.lng,
        west: this.meetupMapBounds.min.lng
      };

      this.map.fitBounds(this.mapBounds);

    }
    catch(err){
    }

  }.bind(this);


  /*
  useGoogleGeoLocate is a fallback if the geolocation is not available.
  */
  this.useGoogleGeoLocate = function(){
      var googleTimeout = setTimeout(function(){
        this.warningMessages.unshift("Looks like the Google server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while.");
        this.warning(true);
    }.bind(this), 8000);
    $.ajax.call(this,{
        url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCywABd4efsIAUleeL-4kdtomWr1NAjG4w',
        dataType: 'json',
        type: 'POST',
        data: {},
        success: function(position) {
          clearTimeout(googleTimeout);
          this.user.position(new google.maps.LatLng(position.location.lat, position.location.lng));
          this.user.begin(this.user.position());
    //        alert(this.user.position.toString());

          this.mapInit.call(this);
        }.bind(this),
        error: function(err) {
          clearTimeout(googleTimeout);
          //this.warning(true);
          //$('#myModal').modal('show');
          this.warningMessages.unshift("Unable to access Google Maps.\nPlease check your internet connection.");
          this.warning(true);
        }.bind(this)
    });
  }.bind(this);


  /*
  getCurrentPosition uses geolocation first with useGoogleGeoLocate as a backup to get the users current position.
  */
  this.getCurrentPosition = function() {
    if (Modernizr.geolocation) {
      if(typeof(google) !== undefined){
        navigator.geolocation.getCurrentPosition(
          function(position){
            this.user.position(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            this.user.begin(this.user.position());
    //        alert(this.user.position.toString());

            this.mapInit.call(this);
            //this.useGoogleGeoLocate();
          }.bind(this),
          function(){
            this.useGoogleGeoLocate();
          }.bind(this)
        );
      }
      else {
        this.useGoogleGeoLocate();
      }
    }
    else {
      this.useGoogleGeoLocate();
    }
  }.bind(this);

  /*
  initialze the map and it's various listeners and subscriptions. Call the meetup and the google maps api.
  */
  this.mapInit = function() {
    var noPoi = [
      {
        featureType: "poi",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];

    this.meetupRequest.CORopenEvents.call(this,this.user.position);

    var mapOptions = {
      center: this.user.position(),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    this.map.setOptions({styles: noPoi});


    google.maps.event.addListenerOnce(this.map, 'bounds_changed', function(){
    });

    /*
    Add a Bounds Change listener to the map. adjust all the necessary map related items.
    */
    google.maps.event.addListener(this.map, 'bounds_changed', function(){
      if (this.weatherCallReducer){
        clearTimeout(this.weatherCallReducer);
      }
      if (this.user.weatherDisplay()){
        this.weatherCallReducer = setTimeout( function(){
          if (this.user.weatherDisplay) {
            this.radarMap.removeRadar();
            this.radarMap.setDimensions(this.map);
            this.radarMap.render(this.map);
          }
        }.bind(this),
        1000);
      } else {
        this.radarMap.removeRadar();
      }
    }.bind(this));

    /*
    Subscribe to the weatherDisplay toggle. If the toggle is active then render the weather overlay.
    */
    this.user.weatherDisplay.subscribe(function(value){
      if (value) {
        this.radarMap.removeRadar();
        this.radarMap.setDimensions(this.map);
        this.radarMap.render(this.map);
      } else {
        this.radarMap.removeRadar();
      }
    }.bind(this));


    this.user.render(this.map);
  }.bind(this);

};


/*
When the document is ready show the login screen.
*/
$(document).ready(function() {
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);
  viewModel.changeScreen('login');
});
