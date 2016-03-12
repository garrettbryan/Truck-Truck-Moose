var program = {
  name: "Meet Truck",
  description: "Meetups and Food Trucks",
  extendedDescription : "Coordinate your love of socializing with your love for food trucks",
  icon: ""
};

var aboutMy = {
  now: new Date(2015,12,07,13,30,00),
  position: {},
  searches: [],
  markers: [],
  weather: {},
  foodTrucks: [],
  meetups: [],
  meetupMapBounds: {},
  mapBounds: {},

/*
meetup map bounds expands the map bounds. But this function should ignore any outliers.  Often times the meetup request returns meetups that do not have the  coorrect lat lons.
*/
  determineMeetupMapBounds: function(){
    var that = this

    var bounds = new google.maps.LatLngBounds();
//    console.log(bounds.toString());
//    console.log("hmm");

    this.meetups.forEach(function(meetup){
      var meetupLatLng;
      if (typeof meetup.venue !== 'undefined'){
        meetupLatLng = new google.maps.LatLng(meetup.venue.lat,meetup.venue.lon)
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
    truck.initRandomMenu;
//    console.log(truck);
  });
  }
}











var foodTrucks10 = [
  {
    name: "Mammoth Meats",
    description: "Grass fed cows cooked up caveman style.",
    tags: [
      "steak",
      "burgers",
      "ostrich",
      "buffalo",
      "great",
      "yummy"
    ],
    menuOfferings: [
      "Lettus Wrapped Burger",
      "Salad",
      "Sticks"
    ],
    img: "images/resize_Woolly_Mammoth.png",
    locTime: []
  },
  {
    name: "The Big Cuban",
    description: "Authentic Cuban sandwiches now that the embargo is lifted.!",
    tags: [
      "sandwich",
      "ham",
      "great",
      "traditional"
    ],
    menuOfferings: [
      "Cuban Sandwich",
      "Fries"
    ],
    img: "images/resize_SandwichSU.png",
    locTime: []
  },
  {
    name: "The Icee Snowman",
    description: "Snocones! Try the high fructose corn syrup flavor!",
    tags: [
      "ice cream",
      "snow cones",
      "waffle cones",
      "sweet"
    ],
    menuOfferings: [
      "Ice Cream",
      "Gelato"
    ],
    img: "images/resize_Snowman_SU.png",
    locTime: []
  },
  {
    name: "Tail of the Whale",
    description: "Sushi from a food truck - awesome!",
    tags: [
      "octopus",
      "sashimi",
      "miso",
      "delicious",
      "expensive"
    ],
    menuOfferings: [
      "Sushi",
      "Sashimi",
      "Soup"
    ],
    img: "images/resize_Blue_Whale.png",
    locTime: []
  },
  {
    name: "Cicada Poppers",
    description: "Awesome crunch",
    tags: [
      "bugs",
      "crickets",
      "fried",
      "slugs",
      "cicadas",
      "cheap"
    ],
    menuOfferings: [
      "Taco",
      "Wrap"
    ],
    img: "images/resize_Cicada.png",
    locTime: []
  },
  {
    name: "The Sailor's Cup",
    description: "Premium coffee from around the world",
    tags: [
      "arabica",
      "columbian",
      "fresh",
      "roasted"
    ],
    menuOfferings: [
      "Pastry",
      "Flavored Coffee"
    ],
    img: "images/resize_Coffee.png",
    locTime: []
  },
  {
    name: "The Hole Enchilada",
    description: "Fusion Gourmet Donuts",
    tags: [
      "glazed",
      "chili",
      "donut ham hamburger",
      "taco donut",
      "great"
    ],
    menuOfferings: [
      "Donut",
      "Donut Holes",
      "Eclair",
      "Enchilada"
    ],
    img: "images/resize_Doughnut.png",
    locTime: []
  },
  {
    name: "Boomerang Hut",
    description: "Kangaroo Steaks!",
    tags: [
      "sausage",
      "grilled onions",
      "grilled peppers",
      "bbq",
      "steak"
    ],
    menuOfferings: [
      "Steak",
      "Coleslaw"
    ],
    img: "images/resize_Kangaroo.png",
    locTime: []
  },
  {
    name: "Overdone",
    description: "Outrageously ostentatious cupcakes",
    tags: [
      "birthday",
      "special occasions",
      "fresh",
      "sprinkles"
    ],
    menuOfferings: [
      "Cupcake",
      "Mini CupCakes"
    ],
    img: "images/resize_Cupcake.png",
    locTime: []
  },
  {
    name: "The Potato Pup",
    description: "Hotdogs topped with crunchy potato chips",
    tags: [
      "sauerkraut",
      "new york",
      "chicago",
      "onions",
      "mustard"
    ],
    menuOfferings: [
      "Hot Dog",
      "Fries"
    ],
    img: "images/resize_Hot_Dog.png",
    locTime: []
  }
];

var foodTrucks1 = foodTrucks10.slice(0,1);
var foodTrucks = foodTrucks10.slice(0,5);
