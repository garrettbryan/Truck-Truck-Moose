
var ViewModel = function() {
  var self = this;
  this.loginScreen = ko.observable(false); // Start empty
  this.signUpScreen = ko.observable(false);
  this.settingsScreen = ko.observable(false);
  this.destinationSelectionScreen = ko.observable(false);
  this.foodTruckScreen = ko.observable(false);
  this.orderScreen = ko.observable(false);
  this.confirmationScreen = ko.observable(false);
  this.arrivedScreen = ko.observable(false);

  this.userName = ko.observable('');
  this.userHandle = ko.observable('');
  this.userEmail = ko.observable('');
  this.userPassword = ko.observable('');
  this.userLatLng = ko.observable('');
  this.userCCNumber = ko.observable('');
  this.userCCExpiration = ko.observable('');
  this.userCCV = ko.observable('');
  this.weatherDisplay = ko.observable(false);


  this.meetups = ko.observableArray(aboutMy.meetups);

  this.userStart = ko.observable('');
  this.userEnd = ko.observable('');

  this.userTruckFilter = ko.observable('');
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
    console.log(self.meetups());
  };

  this.signUp = function(){
    console.log("signup");
    self.loginScreen(false);
    self.signUpScreen(true);
  };
  this.toggleLoginScreen = function() {
    self.loginScreen(!self.loginScreen());
    console.log(self.loginScreen());
  };

  this.toggleSignUpScreen = function() {
    self.signUpScreen(!self.signUpScreen());
    console.log(self.loginScreen());
  };

  this.toggleSettingsScreen = function() {
    self.settingsScreen(!self.settingsScreen());
    console.log(self.settingsScreen());
  };

    this.toggleDestinationSelectionScreen = function() {
    self.destinationSelectionScreen(!self.destinationSelectionScreen());
    console.log(self.destinationSelectionScreen());
  };

    this.toggleFoodTruckScreen = function() {
    self.foodTruckScreen(!self.foodTruckScreen());
    console.log(self.foodTruckScreen());
  };

    this.toggleOrderScreen = function() {
    self.orderScreen(!self.orderScreen());
    console.log(self.orderScreen());
  };

    this.toggleConfirmationScreen = function() {
    self.confirmationScreen(!self.confirmationScreen());
    console.log(self.confirmationScreen());
  };

    this.toggleArrivedScreen = function() {
    self.arrivedScreen(!self.arrivedScreen());
    console.log(self.arrivedScreen());
  };

};

$(document).ready(function() {

  $('body').prepend('<button data-bind="click: toggleLoginScreen">Toggle Login</button>');
  $('body').prepend('<button data-bind="click: toggleSignUpScreen">Toggle signUp</button>');
  $('body').prepend('<button data-bind="click: toggleSettingsScreen">Toggle Settings</button>');
  $('body').prepend('<button data-bind="click: toggleDestinationSelectionScreen">Toggle destination</button>');
  $('body').prepend('<button data-bind="click: toggleFoodTruckScreen">Toggle FoodTruck Selection</button>');
  $('body').prepend('<button data-bind="click: toggleOrderScreen">Toggle Order</button>');
  $('body').prepend('<button data-bind="click: toggleConfirmationScreen">Toggle Order Confirmation</button>');
  $('body').prepend('<button data-bind="click: toggleArrivedScreen">Toggle Arrived</button>');
  $('body').prepend('<button data-bind="click: initMeetups">meetups</button>');


  ko.applyBindings(new ViewModel());

});