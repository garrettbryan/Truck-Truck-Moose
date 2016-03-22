
var ViewModel = function() {
  var self = this;
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

  this.meetups = ko.observableArray();
  this.selectedMeetup = ko.observable('');

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
  this.loginToMap = function(){
    console.log("to Map");
    this.loginScreen(false);
    this.destinationSelectionScreen(true);
  }.bind(this);
  this.loginTosignUp = function(){
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
  this.toMap = function(){
    console.log("to map");
    console.log(this.user);
    this.settingsScreen(false);
    this.destinationSelectionScreen(true);
  }.bind(this);
  this.toFoodTrucks = function() {
    console.log("to Trucks");
    this.destinationSelectionScreen(false);
    this.foodTruckScreen(true);
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


ViewModel.prototype.addMeetupsToMap = function() {
/*
meetup map bounds expands the map bounds. But this function should ignore any outliers.  Often times the meetup request returns meetups that do not have the  coorrect lat lons.
*/
    var that = this;

    var bounds = new google.maps.LatLngBounds();
//    console.log(bounds.toString());
//    console.log("hmm");

    this.meetups.forEach(function(meetup){
      var meetupLatLng;
      if (typeof meetup.venue !== 'undefined'){
        meetupLatLng = new google.maps.LatLng(meetup.venue.lat,meetup.venue.lon);
        //console.dir(google.maps);
        if (meetupLatLng && (google.maps.geometry.spherical.computeDistanceBetween(aboutMy.position,meetupLatLng) < 40000)){
          if (!that.meetupMapBounds.max) {
            that.meetupMapBounds.max = {
              lat: meetup.venue.lat,
              lng: meetup.venue.lon
            };
            that.meetupMapBounds.min = {
              lat: meetup.venue.lat,
              lng: meetup.venue.lon
            };
          }
          that.meetupMapBounds.max.lat =
            that.meetupMapBounds.max.lat > meetup.venue.lat ?
            that.meetupMapBounds.max.lat :
            meetup.venue.lat;
          that.meetupMapBounds.max.lng =
            that.meetupMapBounds.max.lng > meetup.venue.lon ?
            that.meetupMapBounds.max.lng :
            meetup.venue.lon;
          that.meetupMapBounds.min.lat =
            that.meetupMapBounds.min.lat < meetup.venue.lat ?
            that.meetupMapBounds.min.lat :
            meetup.venue.lat;
          that.meetupMapBounds.min.lng =
            that.meetupMapBounds.min.lng < meetup.venue.lon ?
            that.meetupMapBounds.min.lng :
            meetup.venue.lon;
        }
      }
    });
    console.log(that.meetupMapBounds);
    that.mapBounds = {
      north: that.meetupMapBounds.max.lat,
      south: that.meetupMapBounds.min.lat,
      east: that.meetupMapBounds.max.lng,
      west: that.meetupMapBounds.min.lng
    };
    map.fitBounds(that.mapBounds);
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
};

ViewModel.prototype.meetUpInit = function() {
var MeetupRequest = function() {
  this.data = {};
};

MeetupRequest.prototype.CORopenEvents = function(position) {
  var meetupRequestTimeout = setTimeout(function(){
      console.log('Failed to get Meetups.');
  }, 8000);

  $.ajax({
      url: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=' + position.lng() + '&limited_events=False&photo-host=public&page=20&time=%2C1d&radius=25.0&lat=' + position.lat() + '&desc=False&status=upcoming&sig_id=130469302&sig=6ebd2b264bedf38cb1e1af50ef292c0e2eeda64d',
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        /*
        data.results.forEach(function(result){
          var meetup = new Meetup();
          meetup.init(result);
          aboutMy.meetups.push(meetup);
//          console.log(Date(meetup.time))
          meetup.render();
        });
*/
        clearTimeout(meetupRequestTimeout);
        aboutMy.meetups.sort(function(a,b){
          return parseFloat(b.yes_rsvp_count) - parseFloat(a.yes_rsvp_count);
        });
        aboutMy.determineMeetupMapBounds();
      },
      error: function(data) {
        console.log('meetup Error');
        console.log(data);
      }
  });
};
};


ViewModel.prototype.mapInit = function() {
  var self = this;
  if (Modernizr.geolocation) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(
      /*
      Success callback uses the returned latitude and longitude to initialize a google map.
      */
      function(pos){
        self.user.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

        var mapOptions = {
          center: self.user.position,
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        map.setOptions({styles: noPoi});

        console.log("position" + self.user.position);

        google.maps.event.addListenerOnce(map, 'bounds_changed', function(){
        });

        /*
        verify the marker anchor is appropriate
        */
        var marker1 = new google.maps.Marker({
          position: self.user.position,
          map: map,
          title: "Current Location",
          draggable:true
        });

        /*
        add an info window
        */
        var contentString = '<div id="content">'+
          '<h3 id="heading" class="heading">A Heading</h3>' +
          '<div id="body-content"> This is something interesting</div>' +
          '</div>;';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker1.addListener('click', function() {
          infowindow.open(map, marker1);
        });

        var places, infoWindow;
        var markers = [];
        var autocomplete;
        var countryRestrict = {'country': 'us'};
      },
      function(){
        console.log("err");
      }
    );
  }
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
  viewModel.mapInit();

});