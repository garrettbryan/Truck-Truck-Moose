
var Dish = function (menuItem) {
  this.name = ko.observable(menuItem.name);
  this.price = ko.observable(menuItem.price);
  this.ingredients = ko.observableArray(menuItem.ingredients);
  this.editing = ko.observable(false);
};