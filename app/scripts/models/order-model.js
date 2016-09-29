
var Dish = function (menuItem) {
  this.name = ko.observable(menuItem.name);
  this.price = ko.observable(menuItem.price);
  this.ingredients = ko.observableArray(menuItem.ingredients);
  this.editing = ko.observable(false);
};

var SelectedDish = function (orderItem) {
  this.name = ko.observable(orderItem.name());
  this.price = ko.observable(orderItem.price());
  this.ingredients = ko.observableArray(orderItem.ingredients());
  this.editing = ko.observable(false);
};
