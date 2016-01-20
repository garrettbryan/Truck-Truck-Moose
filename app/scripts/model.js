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
    console.log(bounds.toString());
    console.log("hmm");

    this.meetups.forEach(function(meetup){
      var meetupLatLng;
      if (typeof meetup.venue !== 'undefined'){
        meetupLatLng = new google.maps.LatLng(meetup.venue.lat,meetup.venue.lon)
        console.dir(google.maps);
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
    aboutMy.foodTrucks.push(truck);
  });
  }
}

var foodTrucks1 = [
  {
    name: "Mammoth Meats",
    description: "Grass fed cows cooked up caveman style.",
    img: "images/resize_Woolly_Mammoth.png",
    locTime: []
  }
];

var foodTrucks = [
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
  }
]

var foodTrucks10 = [
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
];
