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
      console.log(item.price());
      subtotal += item.price();
    });
    return Number(subtotal.toFixed(2));
  }, this);

  //console.log(Date.now());
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


  this.currentScreen.subscribe(function(screen){
    console.log(screen);
    switch(screen) {
        case 'login':
          console.log('login');
          this.showSettings(false);
          this.resetUser();
          this.turnOffScreens();
          this.loginScreen(true);
          this.getCurrentPosition();
            break;
        case 'signup':
          console.log('signup');
          this.showSettings(false);
          this.user.localSave();
          this.turnOffScreens();
          this.signUpScreen(true);
            break;
        case 'settings':
          console.log('settings');
          //this.showSettings(true);
          this.user.localSave();
          this.turnOffScreens();
          this.settingsScreen(true);
            break;
        case 'destination':
          console.log('destination');
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
          console.log('foodtruck');
          if(this.selectedDestination && this.user.begin() && this.user.end()){
            this.showSettings(true);
            this.description('');
            try {
              this.selectedDestination.keepChosen(this.map, this);
            }
            catch (err) {
              console.log(err);
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
          console.log('order');
          console.log(this.selectedTruckName());
          if(this.selectedTruckName()){
            this.showSettings(true);
            this.description('');
            console.log(this.selectedTruck);
            this.menu(this.selectedTruck.dailyMenu);
            console.log(this.menu());
            console.log(this.selectedTruck);
            this.turnOffScreens();
            this.orderScreen(true);
            this.selectedTruck.keepChosen(this.map, this);
          }
            break;
        case 'confirmation':
          console.log('confirmation');
          console.log(this.order().length>0);
          if(this.order().length>0){
            this.showSettings(true);
            this.puPhrase(makePUPhrase());
            this.turnOffScreens();
            this.confirmationScreen(true);
          }
            break;
        case 'arrived':
          console.log('arrived');
          this.turnOffScreens();
          this.arrivedScreen(true);
            break;
        case 'thankyou':
          console.log('thankyou');
          this.turnOffScreens();
          this.thankYouScreen(true);
            break;
        default:
          console.log(new Error('invalid screen'));
    }
  }.bind(this));


  this.selectedTruckName.subscribe(function(name){
    this.prunedPossibleFoodTrucks().forEach(function(truck, index) {
      if (name === truck.name) {
        this.selectedTruck = this.prunedPossibleFoodTrucks()[index];
      }
    }.bind(this));
  }.bind(this));


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
      console.log(meetup);
      if (meetup.marker) {
        meetup.marker.setVisible(true);
      }
      if(meetup.flightPath){
        meetup.flightPath.setMap(this.map);
      }
    });

  }.bind(this));


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


  this.resetUser = function() {
    //localStorage.setItem('MeetUpTruck', {});
    this.user.init(this.now());
    this.user.getLocalData();
    //this.savelocally();
  }.bind(this);


  this.goBack = function() {
    this.currentScreen(this.screenHistory.pop());
  }.bind(this);;

  this.changeScreen = function(newScreen) {
    console.log(newScreen);
    var screen;
    if (newScreen === 'last') {
      console.log('last');
      if (this.screenHistory()[this.screenHistory().length - 2] === 'signup'){
        console.log('signup');
        screen = 'destination';
      } else {
        if(this.screenHistory()[this.screenHistory().length -1] !== 'settings') {
          console.log(this.screenHistory()[this.screenHistory().length -1]);
          console.log('settings');
          screen = 'settings';
        } else {
          console.log(this.screenHistory()[this.screenHistory().length - 2]);
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
      console.log(this.screenHistory());
      this.currentScreen(screen);
    }
  }.bind(this);;


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
  }.bind(this);;



  this.addFoodTrucksToMap = function(cb) {
    var err = null;
    this.foodTruckRequest.getFoodTrucks.call(this, function(err){
      this.map.fitBounds(new google.maps.LatLngBounds(google.maps.geometry.spherical.computeOffset(this.selectedDestination.marker.position, 5000, 225),google.maps.geometry.spherical.computeOffset(this.selectedDestination.marker.position, 5000, 45)));
      //fitBounds(bounds:LatLngBounds|LatLngBoundsLiteral)
      //LatLngBounds(sw?:LatLng|LatLngLiteral, ne?:LatLng|LatLngLiteral)

      console.log(this.foodTrucks);
      this.prunedPossibleFoodTrucks(this.foodTrucks());
      cb(err);
    }.bind(this));
  }.bind(this);;


  this.renderMeetups = function() {
    console.log(this);
    console.log(this.meetups());
    this.meetups().forEach( function(meetup){
      meetup.render(this.map, this);
    }.bind(this));
    this.meetupsAdded = true;
  }.bind(this);;


  this.addMeetupsToMap = function() {
    console.log(JSON.stringify(this.map.getBounds().getNorthEast()));
    console.log($('#main-form').outerHeight(true));

    var ne = this.map.getBounds().getNorthEast();
    var sw = this.map.getBounds().getSouthWest();
    var scale = 1 << this.map.getZoom();
    var projection = this.map.getProjection();
    var topRight = projection.fromLatLngToPoint(ne);
    var bottomLeft = projection.fromLatLngToPoint(sw);
    var newLatlng = projection.fromPointToLatLng(new google.maps.Point($('#main-form').outerWidth(true)/scale + bottomLeft.x, $('#main-form').outerHeight(true)/scale + topRight.y));

    console.log(JSON.stringify(newLatlng));

    var latDiff = Math.abs(newLatlng.lat()-this.map.getBounds().getNorthEast().lat());

    console.log(latDiff);

    if (this.meetups().length > 0){
      console.log(this.meetups());

      this.meetupMapBounds.max = {
        lat: -360,
        lng: -360
      };
      this.meetupMapBounds.min = {
        lat: 360,
        lng: 360
      };

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
    console.log($('#main-form').outerHeight(true));

    console.log(this.meetupMapBounds);
    try {
      this.mapBounds = {
        north: this.meetupMapBounds.max.lat,
        south: this.meetupMapBounds.min.lat,
        east: this.meetupMapBounds.max.lng,
        west: this.meetupMapBounds.min.lng
      };

    }
    catch(err) {
      console.log("dang no meetups");
      console.log(err);
      //this.noMeetups(true);
      //console.log(this.noMeetups());
    }

    try {
      this.map.fitBounds(this.mapBounds);
      console.log(this.map.getCenter());
      //new google.maps.LatLng({lat: -34, lng: 151});

      //this.map.panTo(new this.map.LatLng({lat: this.map.getCenter().lat() - latDiff, lng: this.map.getCenter().lng()}));
    }
    catch (err){
      console.log(err);
    }

  }.bind(this);;


  this.meetUpInit = function() {
  }.bind(this);;


  this.useGoogleGeoLocate = function(){
      var googleTimeout = setTimeout(function(){
        this.warningMessages.unshift("Looks like the Google server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while.");
        this.warning(true);
        console.log(this.warningMessages());
    }.bind(this), 8000);
    $.ajax.call(this,{
        url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCywABd4efsIAUleeL-4kdtomWr1NAjG4w',
        dataType: 'json',
        type: 'POST',
        data: {},
        success: function(position) {
          clearTimeout(googleTimeout);
          console.log(position);
          //console.log(this);
          this.user.position(new google.maps.LatLng(position.location.lat, position.location.lng));
          console.log(this.user.position().toString());
          this.user.begin(this.user.position());
    //        alert(this.user.position.toString());

          this.mapInit.call(this);
        }.bind(this),
        error: function(err) {
          clearTimeout(googleTimeout);
          console.log(JSON.stringify(err, null, 2));
          //this.warning(true);
          //$('#myModal').modal('show');
          this.warningMessages.unshift("Unable to access Google Maps.\nPlease check your internet connection.");
          this.warning(true);
          console.log(this.warningMessages());
        }.bind(this)
    });
  }.bind(this);;

  this.getCurrentPosition = function() {
    if (Modernizr.geolocation) {
      console.log("geolocation available");
      if(typeof(google) !== undefined){
        navigator.geolocation.getCurrentPosition(
          function(position){
            this.user.position(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            console.log(this.user.position().toString());
            this.user.begin(this.user.position());
    //        alert(this.user.position.toString());

            this.mapInit.call(this);
            //this.useGoogleGeoLocate();
          }.bind(this),
          function(){
            console.log("Could not get location, possibly due to github not supporting https, trying google geolocate api");
            this.useGoogleGeoLocate();
          }.bind(this)
        );
      }
      else {
        this.useGoogleGeoLocate();
        //this.noGoogleMaps(true);
        //$('#myModal').modal('show');
      }
    }
    else {
      this.useGoogleGeoLocate();
      //this.noGeo(true);
    }
  }.bind(this);;

  /*
  initialze the map and it's various listeners and subscriptions. Call the meetup and the google maps api.
  */
  this.mapInit = function() {
    console.log(this);
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

    console.log("position" + this.user.position());

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


    console.log(this.user);
    this.user.render(this.map);
  }.bind(this);;

};


/*
When the document is ready show the login screen.
*/
$(document).ready(function() {
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);
  viewModel.changeScreen('login');
});
