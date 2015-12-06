/*
FoodTruck
*/
var FoodTruck = function(){
  this.name = "";
  this.description = "";
  this.img = "";
  this.schedule = [];
  this.comments = [];
}

FoodTruck.prototype.initialize = function(truckData){
  this.name = truckData.name;
  this.description = truckData.description;
  this.img = truckData.img;
  this.schedule = truckData.schedule;
}

FoodTruck.prototype.getSchedule = function() {
  return this.schedule
}

FoodTruck.prototype.addToSchedule = function(data) {
  this.schedule.push(data);
}

FoodTruck.prototype.removeFromSchedule = function(index) {
  this.schedule.splice(index,1);
}

FoodTruck.prototype.updateSchedule = function(index,data) {
  this.schedule.splice(index,1,data)
}

FoodTruck.prototype.clearSchedule = function(){
  this.scedule = [];
}

FoodTruck.prototype.render = function() {

}