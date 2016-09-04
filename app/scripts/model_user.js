/*
--------Model
The user data is complex enough to warrrant it's own Model.
https://addyosmani.com/blog/understanding-mvvm-a-guide-for-javascript-developers/
1.represents domain-specific data or information that our application will be working with.
2.Models hold information, but typically don’t handle behaviour. They don’t format information or influence how data appears in the browser as this isn’t their responsibility.
3.formatting of data is handled by the View
4.behaviour is considered business logic that should be encapsulated in another layer that interacts with the Model - the ViewModel
5.it’s considered acceptable for Models to validate data being used to define or update existing models
6.KnockoutJS, Models fall under the above definition, but often make Ajax calls to a server-side service to both read and write Model data

--------View
1.A KnockoutJS View is simply a HTML document with declarative bindings to link it to the ViewModel. KnockoutJS Views display information from the ViewModel, pass commands to it (e.g a user clicking on an element) and update as the state of the ViewModel changes. Templates generating markup using data from the ViewModel can however also be used for this purpose.

--------ViewModel
1.the ViewModel can be considered a specialized Controller that acts as a data converter. It changes Model information into View information, passing commands from the View to the Model.



*/
var User = function(){
  this.email = '';
  this.handle = '';
  this.password = '';
  this.rememberMe = false;

  this.now = new Date(2015,12,7,13,30,0);

  //previous selections
  this.previousSearches = [];
  this.previousLocations = [];

  this.previousMeetupsSearches = [];
  this.previousFoodtruckSearches = [];

  this.previouslySelectedMeetups = [];
  this.previouslySelectedFoodtrucks = [];

  this.position = {};
};

/*
initialize user by checking if the session is continuing and if the data is relevant, then reload the last session data. If the data is stale timestamp old then reinitialize the foodtrucks, meetup, and weather data.
*/
User.prototype.init = function(){
  this.email = 'garrettdavisbryan@gmail.com';
  this.handle = 'G-Money';
  this.password = 'cool';
  this.rememberMe = false;
};

/*
check if sessionData exists in local Storage. If true then
*/
User.prototype.continuingSession = function() {

};

User.prototype.staleSessionData = function () {
  var stale = true;
  console.log(this.now.getTime() + 3600000);
  console.log(aboutMy.now.getTime());
  if ((this.now.getTime() + 3600000) > aboutMy.now.getTime()){
    console.log('not stale');
    stale = false;
  }

  return stale;
};

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
  localStorage.setItem('sessionData', JSON.stringify(this));
};

User.prototype.restoreSession = function() {
  var restoredSession = JSON.parse(localStorage.getItem('sessionData'));
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
    case 'food truck':

    break;
    case 'meetup':

    break;
    case 'weather':

    break;
  }
};
