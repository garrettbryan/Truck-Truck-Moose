// get trucks https://fast-basin-67072.herokuapp.com/trucks
var ViewModel = function() {
  this.map = {};

  this.user = new User();

  //this.now = new Date(2015,12,7,13,30,0);
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

  //this.user = new User();
  //this.user.init(this.now());
  this.showSettings = ko.observable(false);

  this.preventMapExposure = ko.observable(true);
  this.exposeMap = ko.observable(true);
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


  this.exposeMap.subscribe(function(expose){
    console.log(expose);
    if (expose === true) {
    }

  }.bind(this));


  this.currentScreen.subscribe(function(screen){
    console.log(screen);
    switch(screen) {
        case 'login':
          console.log('login');
          this.preventMapExposure(true);
          this.showSettings(false);
          this.resetUser();
          this.turnOffScreens();
          this.loginScreen(true);
          this.getCurrentPosition();
          //this.getCurrentPosition(this.mapInit,generalError);
            break;
        case 'signup':
          console.log('signup');
          this.preventMapExposure(true);
          this.showSettings(false);
          //this.configureMainForm('50%', '45px');
          this.user.localSave();
          this.turnOffScreens();
          this.signUpScreen(true);
            break;
        case 'settings':
          console.log('settings');
          this.preventMapExposure(true);
          this.exposeMap(true);
          //this.showSettings(true);
          //this.configureMainForm('100%', '0');
          this.user.localSave();
          this.turnOffScreens();
          this.settingsScreen(true);
            break;
        case 'destination':
          console.log('destination');
          this.preventMapExposure(false);
          this.showSettings(true);
          this.configureMainForm('responsive');
          if(this.meetups() && !this.meetupsAdded){
            this.addMeetupsToMap();
            this.renderMeetups();
          }
          this.turnOffScreens();
          this.destinationSelectionScreen(true);
            break;
        case 'foodtruck':
          console.log('foodtruck');
          this.preventMapExposure(false);
          this.showSettings(true);
          if(this.selectedDestination && this.user.begin() && this.user.end()){
            this.description('');
            //this.configureMainForm('45%', '0');
            try {
              this.selectedDestination.keepChosen(this.map, this);
            }
            catch (err) {
              console.log(err);
            }
            if (!this.foodTrucksAdded){
              this.addFoodTrucksToMap();
              this.turnOffScreens();
              this.foodTruckScreen(true);
            }
          }
            break;
        case 'order':
          console.log('order');
          console.log(this.selectedTruckName());
          this.preventMapExposure(false);
          this.showSettings(true);
          if(this.selectedTruckName()){
            this.description('');
            console.log(this.selectedTruck);
            this.configureMainForm('full');
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
          this.preventMapExposure(false);
          this.showSettings(true);
          if(this.order().length>0){
            this.configureMainForm();
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

    }
  }.bind(this));

  this.selectedTruckName.subscribe(function(name){
    this.prunedPossibleFoodTrucks().forEach(function(truck, index) {
      if (name === truck.name) {
        this.selectedTruck = this.prunedPossibleFoodTrucks()[index];
      }
    }.bind(this));
  }.bind(this));

  this.prunedPossibleFoodTrucks.subscribe(function(foodTrucks) {
    //console.log(this.displayFoodTrucks());
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
    //<img id="main-logo" class="img-responsive center-block img-rounded" alt="MeeTruck Logo">

  }.bind(this));


  this.continue = function() {
    this.warningMessages.shift();
    console.log(this.warningMessages());
    if (this.warningMessages().length === 0){
      this.warning(false);
    }
  }.bind(this);

  this.configureMainForm = function (size) {
    if (size === 'responsive'){
      $('#main-form').addClass('half');
    } else if (size === 'full'){
      if($('#main-form.half').hasClass('half')){
        console.log('hasClass');
        $('#main-form.half').removeClass('half');
      }
    }

  }.bind(this);

/*
  this.configureMainForm = function (height, padding) {
    var mainFormHeight = height;
    var paddingTop = padding;
      $('#main-form').css({'height': mainFormHeight,'padding-top': paddingTop});
  }.bind(this);
*/
  this.init = function() {
    //meetups
    //google maps
    //weather
  };
  this.initMeetups = function(){
    console.log(this.meetups());
  }.bind(this);

  this.resetUser = function() {
    //localStorage.setItem('MeetUpTruck', {});
    this.user.init(this.now());
    this.user.getLocalData();
    //this.savelocally();
  }.bind(this);


  this.toLogin = function(){
    console.log("to Login");
    this.resetUser();
    this.thankYouScreen(false);
    this.loginScreen(true);
    this.getCurrentPosition();
  }.bind(this);
  this.loginToSignUp = function(){
    console.log("signup");
    console.log(this.user);
    this.user.localSave();
    this.loginScreen(false);
    this.signUpScreen(true);
  }.bind(this);
  this.signUpToSettings = function(){
    console.log("settings");
    console.log(this.user);
    //localStorage.setItem('MeetUpTruck', JSON.stringify(this.user));
    this.user.localSave();
    this.signUpScreen(false);
    this.settingsScreen(true);
  }.bind(this);
  this.settingsToMap = function() {
    //localStorage.setItem('MeetUpTruck', JSON.stringify(this.user));
    console.log(this.user);
    this.user.localSave();
    this.toMap();
  }.bind(this);
  this.toMap = function(){
    console.log("to map");
    console.log(this.user);
    if(this.meetups()){
      this.addMeetupsToMap();
      this.renderMeetups();
    }
    this.settingsScreen(false);
    this.loginScreen(false);
    this.foodTruckScreen(false);
    this.destinationSelectionScreen(true);
  }.bind(this);
  this.toFoodTrucks = function() {
    console.log("to Trucks");
    if(this.selectedDestination && this.user.begin() && this.user.end()){
      console.log(this);
      this.description('');
      this.selectedDestination.keepChosen(this.map, this);
      this.addFoodTrucksToMap();
      this.destinationSelectionScreen(false);
      this.foodTruckScreen(true);
    }
  }.bind(this);
  this.toOrder = function() {
    console.log("to Order");
    if(this.selectedTruckName()){
      this.description('');
      console.log(this.selectedTruck);
      this.menu(this.selectedTruck.dailyMenu);
      console.log(this.menu());
      this.foodTruckScreen(false);
      this.orderScreen(true);
      console.log(this.selectedTruck);
      this.selectedTruck.keepChosen(this.map, this);
    }
  }.bind(this);
  this.toConfirmation = function() {
    console.log("to Confirmation");
    console.log(this.order().length>0);
    if(this.order().length>0){
      this.puPhrase(makePUPhrase());
      this.orderScreen(false);
      this.confirmationScreen(true);
    }
  }.bind(this);
//  this.toArrived = function() {
//    console.log("to Arrived");
//    this.confirmationScreen(false);
//    this.arrivedScreen(true);
//  }.bind(this);
//  this.toThankYou = function() {
//    console.log("to ThankYou");
//    this.arrivedScreen(false);
//    this.thankYouScreen(true);
//  }.bind(this);






  this.toggleLoginScreen = function() {
    this.loginScreen(!this.loginScreen());
    console.log(this.loginScreen());
  }.bind(this);
  this.toggleSignUpScreen = function() {
    this.signUpScreen(!this.signUpScreen());
    console.log(this.loginScreen());
  }.bind(this);
  this.toggleSettingsScreen = function() {
    this.settingsScreen(!this.settingsScreen());
    console.log(this.settingsScreen());
  }.bind(this);
  this.toggleDestinationSelectionScreen = function() {
    this.destinationSelectionScreen(!this.destinationSelectionScreen());
    console.log(this.destinationSelectionScreen());
  }.bind(this);
  this.toggleFoodTruckScreen = function() {
    this.foodTruckScreen(!this.foodTruckScreen());
    console.log(this.foodTruckScreen());
  }.bind(this);
  this.toggleOrderScreen = function() {
    this.orderScreen(!this.orderScreen());
    console.log(this.orderScreen());
  }.bind(this);
  this.toggleConfirmationScreen = function() {
    this.confirmationScreen(!this.confirmationScreen());
    console.log(this.confirmationScreen());
  }.bind(this);
  this.toggleArrivedScreen = function() {
    this.arrivedScreen(!this.arrivedScreen());
    console.log(this.arrivedScreen());
  }.bind(this);
  this.toggleThankYouScreen = function() {
    this.thankYouScreen(!this.thankYouScreen());
    console.log(this.thankYouScreen());
  }.bind(this);

};

ViewModel.prototype.changeScreen = function(newScreen) {
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
  } else {
    screen = newScreen;
  }
  this.screenHistory.push(screen);
  console.log(this.screenHistory());
  this.currentScreen(screen);

};

ViewModel.prototype.turnOffScreens = function(){
  this.loginScreen(false);
  this.signUpScreen(false);
  this.settingsScreen(false);
  this.destinationSelectionScreen(false);
  this.foodTruckScreen(false);
  this.orderScreen(false);
  this.confirmationScreen(false);
  this.arrivedScreen(false);
  this.thankYouScreen(false);
};



ViewModel.prototype.addFoodTrucksToMap = function() {
  this.foodTrucksAdded = true;
  console.log(foodTrucks10);
  foodTrucks10.forEach(function(truckData){
    console.log(truckData);
    var truck = new FoodTruck();
    truck.initNoSchedule(truckData,this.map);
    console.log(this.user);
    console.log(this.selectedDestination);
    truck.create3RandomStopPoints(this.selectedDestination, this.map);
  //      truck.create3SpecificStopPoints(aboutMy.position, map, aboutMy.now);
    truck.getDirections();
    truck.calculateAndDisplayRoute(truck.directionsService, truck.directionsDisplay);
    truck.render(this, this.map);
    truck.initRandomMenu();
    this.foodTrucks.push(truck);
  }.bind(this));

    this.map.fitBounds(new google.maps.LatLngBounds(google.maps.geometry.spherical.computeOffset(this.selectedDestination.marker.position, 5000, 225),google.maps.geometry.spherical.computeOffset(this.selectedDestination.marker.position, 5000, 45)));
    //fitBounds(bounds:LatLngBounds|LatLngBoundsLiteral)
    //LatLngBounds(sw?:LatLng|LatLngLiteral, ne?:LatLng|LatLngLiteral)

  console.log(this.foodTrucks);
  this.prunedPossibleFoodTrucks(this.foodTrucks());
};


var noPoi = [
  {
    featureType: "poi",
    stylers: [
      { visibility: "off" }
    ]
  }
];

ViewModel.prototype.renderMeetups = function() {
  console.log(this);
  console.log(this.meetups());
  this.meetups().forEach( function(meetup){
    meetup.render(this.map, this);
  }.bind(this));
  this.meetupsAdded = true;
};


ViewModel.prototype.addMeetupsToMap = function() {
/*
meetup map bounds exp             the meetup request returns meetups this do not have the  coorrect lat lons.
*/
    //var this = this;

  //var bounds = new google.maps.LatLngBounds();F
//    console.log(bounds.toString());

  console.log(JSON.stringify(this.map.getBounds().getNorthEast()));
  console.log($('#main-form').outerHeight(true));

    var ne = this.map.getBounds().getNorthEast();
    var sw = this.map.getBounds().getSouthWest();
    var scale = 1 << this.map.getZoom();
    var projection = this.map.getProjection();
    var topRight = projection.fromLatLngToPoint(ne);
    var bottomLeft = projection.fromLatLngToPoint(sw);

    //var newLatlng = projection.fromPointToLatLng(new google.maps.Point(xcoor / scale + bottomLeft.x, ycoor / scale + topRight.y));
    var newLatlng = projection.fromPointToLatLng(new google.maps.Point($('#main-form').outerWidth(true)/scale + bottomLeft.x, $('#main-form').outerHeight(true)/scale + topRight.y));
    console.log(JSON.stringify(newLatlng));

    var latDiff = Math.abs(newLatlng.lat()-this.map.getBounds().getNorthEast().lat());
    console.log(latDiff);


  if (this.meetups().length > 0){
    console.log(this.meetups());
/*
    this.meetupMapBounds.max = {
      lat: this.map.getBounds().getNorthEast().lat(),
      lng: this.map.getBounds().getNorthEast().lng()
    };
    this.meetupMapBounds.min = {
      lat: this.map.getBounds().getSouthWest().lat(),
      lng: this.map.getBounds().getSouthWest().lng()
    };
*/

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

  } else {
    //alert("dang no meetups");
    console.log("dang no meetups");
    //this.noMeetups(true);
    //console.log(this.noMeetups());
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

/*
  var overlay = new google.maps.OverlayView();
  overlay.draw = function () {};
  overlay.setMap(this.map);

  var point = new google.maps.Point(1,$('#main-form').outerHeight(true));
  var projection = this.map.getProjection();

  console.log(projection);
  console.log(overlay.getProjection().fromContainerPixelToLatLng(point));
*/
/*

    var weather = new WeatherUnderground();
    weather.setDimensions(map);
    //weather.render();
    aboutMy.weather = weather;

    aboutMy.foodTrucks = [];
    //locallyRandomizeFoodTruck(this.getBounds(), pos);

    foodTrucks.forEach(function(truckData){
      var truck = new FoodTruck();
      truck.initNoSchedule(truckData);
      truck.create3RandomStopPoints(aboutMy.position, map);
    //      truck.create3SpecificStopPoints(aboutMy.position, map, aboutMy.now);
      truck.getDirections();
      truck.calculateAndDisplayRoute(truck.directionsService, truck.directionsDisplay);
      truck.initRandomMenu();
  //    console.log(truck);
    });
*/
};

ViewModel.prototype.meetUpInit = function() {
};

var generalSuccess = function() {
  console.log(this);
};

var generalError = function(){
  alert('error');
};

ViewModel.prototype.useGoogleGeoLocate = function(){
  $.ajax.call(this,{
      url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCywABd4efsIAUleeL-4kdtomWr1NAjG4w',
      dataType: 'json',
      type: 'POST',
      data: {},
      success: function(position) {
        console.log(position);
        //console.log(this);
        this.user.position(new google.maps.LatLng(position.location.lat, position.location.lng));
        console.log(this.user.position().toString());
        this.user.begin(this.user.position());
  //        alert(this.user.position.toString());

        this.mapInit.call(this);
      }.bind(this),
      error: function(err) {
        console.log(JSON.stringify(err, null, 2));
        //this.warning(true);
        this.warningMessages.unshift("geolocation error with ajax");
        this.warning(true);
        console.log(this.warningMessages());
      }.bind(this)
  });
};

ViewModel.prototype.getCurrentPosition = function() {
  if (Modernizr.geolocation) {
    console.log("geolocation available");
    if(google){
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
          console.log("could not get location, possibly due to github not supporting https, trying google geolocate api");
          this.useGoogleGeoLocate();
        }.bind(this)
      );
    }
    else {
      this.noGoogleMaps(true);
    }
  }
  else {
    this.noGeo(true);
  }
};


ViewModel.prototype.mapInit = function() {
  console.log(this);

  this.meetupRequest.CORopenEvents.call(this,this.user.position);

  this.foodTruckRequest.getFoodTrucks.call(this);


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


  /*
  verify the marker anchor is appropriate

  var marker1 = new google.maps.Marker({
    position: this.user.position(),
    map: this.map,
    title: "Current Location",
    draggable:true
  });

  /*
  add an info window

  var contentString = '<div id="content">'+
    '<h3 id="heading" class="heading">You are here.</h3>' +
    '<div id="body-content"> Wow you are right here</div>' +
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker1.addListener('click', function() {
    infowindow.open(this.map, marker1);
  });
*/
};


$(document).ready(function() {
/*
  $('#button-navi').prepend('<button data-bind="click: toggleLoginScreen">Toggle Login</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleSignUpScreen">Toggle signUp</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleSettingsScreen">Toggle Settings</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleDestinationSelectionScreen">Toggle destination</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleFoodTruckScreen">Toggle FoodTruck Selection</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleOrderScreen">Toggle Order</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleConfirmationScreen">Toggle Order Confirmation</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleArrivedScreen">Toggle Arrived</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleThankYouScreen">Toggle Thank You</button>');
*/
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);
  viewModel.changeScreen('login');
  //viewModel.mapInit();


});