var PhysicalLocation = function(locationData) {
  console.log("make location");
  this.position = ko.observable('');
  this.startTime = ko.observable('');
  this.endTime = ko.observable('');
};

var Entity = function(entityData) {
  console.log("make entity");
  this.name = ko.observable('');
  this.email = ko.observable('');
  PhysicalLocation.call(this);
};
Entity.prototype = Object.create(PhysicalLocation.prototype);
Entity.prototype.constructor = Entity;

var User = function(userData) { //populate from the local storage first.
  console.log("make user");
  this.handle = ko.observable('');
  this.password = ko.observable('');
  this.ccNumber = ko.observable('');
  this.ccExpiration = ko.observable('');
  this.ccv = ko.observable('');
  this.weatherDisplay = ko.observable(false);
  this.rememberMe = ko.observable(false);
  this.favoriteFood = ko.observableArray('');
  this.currentLogin = '';
  //this.lastLogin = '';
  Entity.call(this);
};
User.prototype = Object.create(Entity.prototype);
User.prototype.constructor = User;

var Institution = function(institutionData){
  this.description = ko.observable(institutionData.description || '');
  Entity.call(this);
};
Institution.prototype = Object.create(Entity.prototype);
Institution.prototype.constructor = Institution;

var Meetup = function(meetupData) {//populate via Meetup.com ajax call.
  this.rsvp = ko.observable(meetupData);
  Institution.call(this);
};
Meetup.prototype = Object.create(Institution.prototype);
Meetup.prototype.constructor = Meetup;

var FoodTruck = function(truckData) {//populate via Meetup.com ajax call.
  this.menu = ko.observableArray();
  this.schedule = ko.observableArray();
  Institution.call(this);
};
FoodTruck.prototype = Object.create(Institution.prototype);
FoodTruck.prototype.constructor = FoodTruck;

var NavPoint = function(navData) {
  PhysicalLocation.call(this);
};
NavPoint.prototype = Object.create(PhysicalLocation.prototype);
NavPoint.prototype.constructor = NavPoint;

/*
FoodLists
*/
var FoodList = function(listData) {//populate via random generator or server
  this.foodlist = ko.observableArray();
};

var Menu = function(menuData){
  FoodList.call(this);
};
Menu.prototype = Object.create(FoodList.prototype);
Menu.prototype.constructor = Menu;

var FoodOrder = function() {//populate based on user input.
  this.orderNumber = Math.random()*1000000; //pseudo po number
  this.pickupPhrase = ko.observable('');
  this.pickupTime = ko.observable('');
  this.subTotal = ko.observable('0');
  this.tax = ko.computed();
  this.total = ko.computed();
  FoodList.call(this);
};
FoodOrder.prototype = Object.create(FoodList.prototype);
FoodOrder.prototype.constructor = FoodOrder;


var Item = function(itemData){
  this.name = ko.observable(itemData.name || '');
  this.price = ko.observable(itemData.price || '');
};

var Offering = function(offeringData){
  this.ingredients = ko.observableArray(offeringData.ingredients);
  Item.call(this);
};
Offering.prototype = Object.create(Item.prototype);
Offering.prototype.constructor = Offering;
