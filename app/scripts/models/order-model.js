/*
  The Dish and Selected Dish are the two objects for menu items and ordered items.
  It might be appropriate to merge these into a single object.
*/
var Dish = function (menuItem) {
  this.name = ko.observable(menuItem.name);
  this.price = ko.observable(menuItem.price);
  this.ingredients = ko.observableArray(menuItem.ingredients.slice(0));
  this.editing = ko.observable(false);
};

var SelectedDish = function (orderItem) {
  this.name = ko.observable(orderItem.name());
  this.price = ko.observable(orderItem.price());
  this.ingredients = ko.observableArray(orderItem.ingredients().slice(0));
  this.editing = ko.observable(false);
};
