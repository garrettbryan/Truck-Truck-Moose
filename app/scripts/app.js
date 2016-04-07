
var ViewModel = function() {
  this.map = {};

  //this.now = new Date(2015,12,7,13,30,0);
  this.now = ko.observable(Date().toString());
  this.loginScreen = ko.observable(false); // Start empty
  this.signUpScreen = ko.observable(false);
  this.settingsScreen = ko.observable(false);
  this.destinationSelectionScreen = ko.observable(false);
  this.foodTruckScreen = ko.observable(false);
  this.orderScreen = ko.observable(false);
  this.confirmationScreen = ko.observable(false);
  this.arrivedScreen = ko.observable(false);
  this.thankYouScreen = ko.observable(false);

  this.user = new User();
  this.user.init(this.now());

  this.filter = ko.observable('');

  this.meetupRequest = new MeetupRequest();
  this.meetups = ko.observableArray();
  this.prunedPossibleDestinations = ko.observableArray();
  this.prunedPossibleNames = ko.observableArray();
  this.selectedDestination = {};
  this.meetupMapBounds = {};

  this.foodTrucks = ko.observableArray();
  this.selectedTruck = ko.observable('');

  this.menu = ko.observableArray;

  this.order = ko.observableArray;
  this.orderSubtotal = ko.observable('0');
  this.orderTax = ko.observable('0');
  this.orderTotal = ko.observable('0');

  this.puTime = ko.observable('');
  this.puPhrase = ko.observable('');


  this.init = function() {
    //meetups
    //google maps
    //weather
  };


  this.initMeetups = function(){
    console.log(this.meetups());
  }.bind(this);

  this.resetUser = function() {
    this.user = new User();
  }.bind(this);
  this.toLogin = function(){
    console.log("to Login");
    this.thankYouScreen(false);
    this.loginScreen(true);
  }.bind(this);
  this.loginToSignUp = function(){
    console.log("signup");
    console.log("this.user");
    this.loginScreen(false);
    this.signUpScreen(true);
  }.bind(this);
  this.signUpToSettings = function(){
    console.log("signup");
    console.log(this.user);
    localStorage.setItem('MeetUpTruck', ko.toJSON(this.user));
    this.signUpScreen(false);
    this.settingsScreen(true);
  }.bind(this);
  this.settingsToMap = function() {
    localStorage.setItem('MeetUpTruck', ko.toJSON(this.user));
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
    console.log(this.selectedDestination);
    if(this.selectedDestination && this.user.begin() && this.user.end()){
      this.selectedDestination.keepChosen(this.map, this);

      this.destinationSelectionScreen(false);
      this.foodTruckScreen(true);
    }
  }.bind(this);
  this.toOrder = function() {
    console.log("to Order");
    this.foodTruckScreen(false);
    this.orderScreen(true);
  }.bind(this);
  this.toConfirmation = function() {
    console.log("to Confirmation");
    this.orderScreen(false);
    this.confirmationScreen(true);
  }.bind(this);
  this.toArrived = function() {
    console.log("to Arrived");
    this.confirmationScreen(false);
    this.arrivedScreen(true);
  }.bind(this);
  this.toThankYou = function() {
    console.log("to ThankYou");
    this.arrivedScreen(false);
    this.thankYouScreen(true);
  }.bind(this);


  this.savelocally = function(){
    console.log(this.user);
    localStorage.setItem('MeetUpTruck', ko.toJSON(this.user));
    console.log(ko.utils.parseJson(localStorage.getItem('MeetUpTruck')));
  }.bind(this);





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
};


ViewModel.prototype.addMeetupsToMap = function() {
/*
meetup map bounds expands the map bounds. But this function should ignore any outliers.  Often times the meetup request returns meetups this do not have the  coorrect lat lons.
*/
    //var this = this;

  //var bounds = new google.maps.LatLngBounds();
//    console.log(bounds.toString());
  console.log(this.map.getBounds().getNorthEast());
  if (this.meetups().length > 0){
    console.log(this.meetups());

    this.meetupMapBounds.max = {
      lat: this.map.getBounds().getNorthEast().lat(),
      lng: this.map.getBounds().getNorthEast().lng()
    };
    this.meetupMapBounds.min = {
      lat: this.map.getBounds().getSouthWest().lat(),
      lng: this.map.getBounds().getSouthWest().lng()
    };

    this.meetups().forEach(function(meetup){
      //console.log(meetup);
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
  }

    console.log(this.meetupMapBounds);
    this.mapBounds = {
      north: this.meetupMapBounds.max.lat,
      south: this.meetupMapBounds.min.lat,
      east: this.meetupMapBounds.max.lng,
      west: this.meetupMapBounds.min.lng
    };


    this.map.fitBounds(this.mapBounds);

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


ViewModel.prototype.getCurrentPosition = function(successCB, errorCB) {
  if (Modernizr.geolocation) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(
      function(position){
        this.user.position(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        console.log(this.user.position().toString());
        //this.user.begin = this.user.position();
//        alert(this.user.position.toString());
        successCB.call(this);
      }.bind(this),
      function(){
        alert("err");
        errorCB.call(this);
      }.bind(this)
    );
  }
};


ViewModel.prototype.mapInit = function() {
  console.log(this);

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
  verify the marker anchor is appropriate
  */
  var marker1 = new google.maps.Marker({
    position: this.user.position(),
    map: this.map,
    title: "Current Location",
    draggable:true
  });

  /*
  add an info window
  */
  var contentString = '<div id="content">'+
    '<h3 id="heading" class="heading">You are here.</h3>' +
    '<div id="body-content"> Wow you are right here</div>' +
    '</div>;';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker1.addListener('click', function() {
    infowindow.open(this.map, marker1);
  });

};


$(document).ready(function() {

  $('#button-navi').prepend('<button data-bind="click: toggleLoginScreen">Toggle Login</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleSignUpScreen">Toggle signUp</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleSettingsScreen">Toggle Settings</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleDestinationSelectionScreen">Toggle destination</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleFoodTruckScreen">Toggle FoodTruck Selection</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleOrderScreen">Toggle Order</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleConfirmationScreen">Toggle Order Confirmation</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleArrivedScreen">Toggle Arrived</button>');
  $('button:last-of-type').after('<button data-bind="click: toggleThankYouScreen">Toggle Thank You</button>');

  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);
  viewModel.toLogin();
  viewModel.getCurrentPosition(viewModel.mapInit,generalError);
  //viewModel.mapInit();


});