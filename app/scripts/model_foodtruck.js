/*
FoodTruck
schedule is an array of objects of stoptimes in 24hour timestamps and stoppoints given in latitude and longitude. The stop times should not overlap. The Foodtrucks will be indicated on the map at various times. Having a future postion data will allow users to plan a rendezvous
{
  lat: x,
  lng: y,
  startTime: T0,
  endTime: T1
}

*/
var FoodTruck = function(){
  this.traveling = false;
  this.active = false;
  this.position = {};
  this.name = "";
  this.description = "";
  this.img = "";
  this.tImg = "images/resize_Food_Truck.png",
  this.schedule = [];
  this.comments = [];
  this.currentEvent = 0;
}

FoodTruck.prototype.initNoSchedule = function(truckData){
  this.name = truckData.name;
  this.description = truckData.description;
  this.img = truckData.img;
}

FoodTruck.prototype.getDirections = function(){
  this.directionsService = new google.maps.DirectionsService;
  //this.directionsDisplay = new google.maps.DirectionsRenderer;
  //this.directionsDisplay.setMap(map);
  this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
}

/*
calculateAndDisplayRoute pushes a FoodTrucks intermediate stops into the
waypoints array then requests a route be created from google.
*/
FoodTruck.prototype.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
  if (this.schedule.length > 1) {
    var waypoints = [];
    for (var i = 1; i < this.schedule.length-1; i++) {
      waypoints.push({
        location: new google.maps.LatLng(this.schedule[i].lat, this.schedule[i].lng),
        stopover:true
      });
    }

    directionsService.route(
      {
        origin: new google.maps.LatLng(this.schedule[0].lat, this.schedule[0].lng),
        destination: new google.maps.LatLng(this.schedule[this.schedule.length-1].lat, this.schedule[this.schedule.length-1].lng),
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING
      },
      function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          //directionsDisplay.setDirections(response);

          var flightPath = new google.maps.Polyline({
            path: response.routes[0].overview_path,
            geodesic: true,
            strokeColor: getColor(),
            strokeOpacity: 1.0,
            strokeWeight: 2
          });

          flightPath.setMap(map);




          console.log(response.routes[0].overview_path);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }
}

function getColor(){
    return '#'+Math.floor(Math.random() * 16777215).toString(16);
}

/*
https://developers.google.com/maps/documentation/javascript/shapes
This is an example to replace default route styling with custom food truck
styling

// This example creates a 2-pixel-wide red polyline showing the path of William
// Kingsford Smith's first trans-Pacific flight between Oakland, CA, and
// Brisbane, Australia.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: 0, lng: -180},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  var flightPlanCoordinates = [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
  ];
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}





*/
/*
{
  origin: "Chicago, IL",
  destination: "Los Angeles, CA",
  waypoints: [
    {
      location:"Joplin, MO",
      stopover:false
    },{
      location:"Oklahoma City, OK",
      stopover:true
    }],
  provideRouteAlternatives: false,
  travelMode: google.maps.TravelMode.DRIVING,
  drivingOptions: {
    departureTime: new Date(now, or future date ),
    trafficModel: google.maps.TrafficModel.PESSIMISTIC
  }
  unitSystem: UnitSystem.IMPERIAL
}




function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 41.85, lng: -87.65}
  });
  directionsDisplay.setMap(map);

  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
*/





FoodTruck.prototype.determinePosition = function(now) {
  var nowSecs = now.getHours()*3600 + now.getMinutes()*60;
  this.pinPoint(nowSecs);
  if (this.traveling && this.currentEvent > 0 && this.currentEvent < this.schedule.length) {
    this.position.lat = (this.schedule[this.currentEvent].lat - this.schedule[this.currentEvent - 1 ].lat)*nowSecs/this.schedule[this.currentEvent].starttime.seconds + this.schedule[this.currentEvent - 1 ].lat;
    this.position.lng = (this.schedule[this.currentEvent].lng - this.schedule[this.currentEvent - 1 ].lng)*nowSecs/this.schedule[this.currentEvent].starttime.seconds + this.schedule[this.currentEvent - 1 ].lng;
  }
}


FoodTruck.prototype.pinPoint = function(nowSecs) {
  this.traveling = true;
  for (var i = 0; i < this.schedule.length; i++) {
    if (nowSecs > this.schedule[i].starttime.getSecs() && nowSecs < this.schedule[i].endtime.getSecs()){
      this.traveling = false;
      this.currentEvent = i;
      this.position.lat = this.schedule[i].lat;
      this.position.lng = this.schedule[i].lng;
    } else {
      this.currentEvent = nowSecs < this.schedule[i].starttime.getSecs() ? i : i+1;
    }
  }
}

/*
randomizeStopPoint takes the users postion and the google map(needs the bounds of the map) to randomly distribute the foodtrucks around the user within the bounds of the map. The radius of the circular distribution area is constrained by the smallest dimension of the map - 1/2 height of the custom markers.
*/
FoodTruck.prototype.randomizeStopPoint = function(pos, map) {
  var dayOver = 22 * 3600; //the food trucks last stop begins at 22 hours
  var bounds = map.getBounds();

  var boundLat = bounds.getNorthEast().lat()-bounds.getSouthWest().lat();
  var boundLng = bounds.getNorthEast().lng()-bounds.getSouthWest().lng();

  var boundLatLng = Math.abs(boundLat) <= Math.abs(boundLng) ? boundLat : boundLng;

  var recenterFoodTrucks = Math.abs(boundLat - boundLng)/2;

  var initialTime = this.schedule.length > 0 ? this.schedule[this.schedule.length-1].endtime.getSecs()+1800 : 0; //Gives at least a 30minute buffer till the next stop.
  if (initialTime < dayOver){
    var time = initialTime + Math.random()*(dayOver-initialTime); //Determines when the next stop occurs
    //console.log(time);
    var stime = new tm();
    stime.initSecs(time)
    var etime = new tm();
    etime.initSecs(time + 3600);
    this.schedule.push({
      lat: bounds.getSouthWest().lat() + boundLatLng * Math.random() + recenterFoodTrucks,
      lng: bounds.getSouthWest().lng() + boundLatLng * Math.random(),
      starttime: stime,
      endtime: etime
    });
    //console.log(this);
  }
}

/*
  var geocoder = new google.maps.Geocoder;

  aboutMy.foodTrucks.forEach(function(truck){

        truck.marker = new google.maps.Marker({
      position: new google.maps.LatLng(truck.locTime[0].randomLat, truck.locTime[0].randomLng),
      map: map,
      title: truck.name,
      icon: truck.img,
      draggable:true
    });
  }
  geocodeLatLng(geocoder, map, truck.locTime[0].randomLat, truck.locTime[0].randomLng);
  });
*/

FoodTruck.prototype.create3RandomStopPoints = function(pos, map) {
  /*
  Foodtrucks have 3  randomized 1 hour stops unless the end of day is reached. The function takes the initial time and adds a random fraction of the difference between initial and final times.
  */
  for (var i = 0; i < 3; i++){
    this.randomizeStopPoint(pos, map);
  }
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
  console.log(this);
  console.log(this.currentEvent);
  var icon = this.img;
  if (this.traveling){
    var icon = this.tImg;
  }

  this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(this.position.lat, this.position.lng),
    map: map,
    title: this.name,
    icon: icon,
    draggable: true
  });

  this.getDirections();
}

FoodTruck.prototype.getGeoCodeer = function() {
/*
          function geocodeLatLng(geocoder, map, lata, lnga) {
          var latlng = {lat: lata, lng: lnga};
          geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[1]) {
               // var marker = new google.maps.Marker({
               //   position: latlng,
               //   map: map
               // });
                console.log(results[1].formatted_address);
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });
        }
*/
}