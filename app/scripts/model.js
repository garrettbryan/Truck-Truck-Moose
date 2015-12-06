var aboutMy = {
  position: {},
  searches: [],
  markers: [],
  weather: {},
  foodTrucks: [
    {
      name: "Mammoth Meats",
      description: "Grass fed cows cooked up caveman style.",
      img: "images/resize_Woolly_Mammoth.png",
      locTime: []
    },
    {
      name: "The Big Cuban",
      description: "Authentic cuban sandwiches now that the embargo is lifted.!",
      img: "images/resize_SandwichSU.png",
      locTime: []
    },
    {
      name: "The Icee Snowman",
      description: "Snocones! Try the high fructose corn syrup flavor!",
      img: "images/resize_Snowman_SU.png",
      locTime: []
    },
    {
      name: "Tail of the Whale",
      description: "Sushi from a food truck - awesome!",
      img: "images/resize_Blue_Whale.png",
      locTime: []
    },
    {
      name: "Cicada Poppers",
      description: "Awesome crunch",
      img: "images/resize_Cicada.png",
      locTime: []
    },
    {
      name: "The Sailor's Cup",
      description: "Premium Coffee from around the world",
      img: "images/resize_Coffee.png",
      locTime: []
    },
    {
      name: "The Hole Enchilada",
      description: "Fusion Gourmet Donuts",
      img: "images/resize_Doughnut.png",
      locTime: []
    },
    {
      name: "Boomerang Hut",
      description: "Kangaroo Steaks!",
      img: "images/resize_Kangaroo.png",
      locTime: []
    },
    {
      name: "Overdone",
      description: "Outrageously ostentatious cupcakes",
      img: "images/resize_Cupcake.png",
      locTime: []
    },
    {
      name: "The Potato Pup",
      description: "Hotdogs topped with crunchy potato chips",
      img: "images/resize_Hot_Dog.png",
      locTime: []
    }
  ]
}

/*

*/

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

