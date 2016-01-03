"use strict";


/*
The user data is complex enough to warrrant it's own Model.

*/
var User = function(){
  this.email = "";
  this.handle = "";
  this.password = "";
  this.rememberMe = false;

  this.now = new Date();

  //previous selections
  this.previousSearches = [];
  this.previousLocations = [];
  this.previousMeetups = [];
  this.previousFoodtrucks = [];

  this.position = {};
};

/*
initialize user by checking if the session is continuing and if the data is relevant, then reload the last session data. If the data is stale timestamp old then reinitialize the foodtrucks, meetup, and weather data.
*/
User.prototype.init = function(){
  this.email = "garrettdavisbryan@gmail.com";
  this.handle = "G-Money";
  this.password = "cool";
  this.rememberMe = true;
};

/*
check if sessionData exists in local Storage. If true then
*/
User.prototype.continuingSession = function() {

};

User.prototype.staleSessionData = function () {
  var stale = true;
  if ((this.now.getTime() + 3600000) > aboutMy.now){
    console.log("not stale");
    stale = false;
  }

  return stale;
}

User.prototype.signIn = function(){

};

User.prototype.signUp = function(){

};

User.prototype.recentSearches = function() {

};

User.prototype.recentLocations = function() {

};

User.prototype.recentMeetups = function() {

};

User.prototype.sessionFoodTrucks = function() {

};

User.prototype.sessionMeetups = function() {

};

User.prototype.sessionWeather = function() {

};

User.prototype.saveSession = function() {
  localStorage.setItem("sessionData", JSON.stringify(this));
};

User.prototype.restoreSession = function() {
  var restoredSession = JSON.parse(localStorage.getItem("sessionData"));
  for (var prop in restoredSession) {
    if (this.hasOwnProperty(prop)) {
    this[prop] = restoredSession[prop];
    } else {
      console.log('doesnot have own property ' + prop);
    }
  }
  this.now = (this.now instanceof Date) ? this.now : new Date(this.now);
  console.log(this);
  console.log(this.staleSessionData());
};

User.prototype.addSessionData = function(type, value) {
  switch (type) {
    case "food truck":

    break;
    case "meetup":

    break;
    case "weather":

    break;
  }
};