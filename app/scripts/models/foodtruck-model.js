/*
FoodTruck
schedule is an array of objects of stoptimes in 24hour timestamps and stoppoints given in latitude and longitude. The stop times should not overlap. The Foodtrucks will be indicated on the map at various times. Having a future postion data will allow users to plan a rendezvous
{
  lat: x,
  lng: y,
  startTime: T0,
  endTime: T1
};
*/

//var FoodTruck = function(){
//  this.traveling = false;
//  this.active = false;
//  this.position = {};
//  this.name = '';
//  this.description = '';
//  this.tags = [];
//  this.menuOfferings = [];
//  this.dailyMenu = [];
//  this.img = '';
//  this.tImg = 'images/resize_Food_Truck.png';
//  this.schedule = [];
//  this.comments = [];
//  this.currentEvent = 0;
//  this.responses = [];
//  this.mapPath = [];
//  this.menu = {};
//};


FoodTruck.prototype.initNoSchedule = function(truckData, map){
  this.name = truckData.name;
  this.map = map;
  this.description = truckData.description;
  this.img = truckData.img;
  this.tags = truckData.tags;
  this.menuOfferings = truckData.menuOfferings;
  this.initRandomMenu();
  this.flightPaths = [];
};

FoodTruck.prototype.initRandomMenu = function(){
  this.menuOfferings.forEach(function(offering){
    this.dailyMenu.push(makeRandomMenuItem(offering));
  }, this);
};


/*
randomizeStopPoint takes the users postion and the google map(needs the bounds of the map) to randomly distribute the foodtrucks around the user within the bounds of the map. The radius of the circular distribution area is constrained by the smallest dimension of the map - 1/2 height of the custom markers.
*/
FoodTruck.prototype.randomizeStopPoint = function(pos, map) {
  console.log(pos);
  var dayOver = 22 * 3600; //the food trucks last stop begins at 22 hours
  var bounds = map.getBounds();

  var boundLat = bounds.getNorthEast().lat()-bounds.getSouthWest().lat();
  var boundLng = bounds.getNorthEast().lng()-bounds.getSouthWest().lng();
  var boundLatLng;

  var initialTime = this.schedule.length > 0 ? this.schedule[this.schedule.length-1].endtime.getSecs()+1800 : 0; //Gives at least a 30minute buffer till the next stop.
  if (initialTime < dayOver){
    var time = initialTime + Math.random()*(dayOver-initialTime); //Determines when the next stop occurs
    //console.log(time);s
    var stime = new TimeHelper();
    stime.initSecs(time);
    var etime = new TimeHelper();
    etime.initSecs(time + 3600);

    this.schedule.push({
      lat: bounds.getSouthWest().lat() + boundLat * Math.random(),
      lng: bounds.getSouthWest().lng() + boundLng * Math.random(),
      starttime: stime,
      endtime: etime
    });
    //console.log(this);
  }
};

/*
Foodtrucks have 3  randomized 1 hour stops unless the end of day is reached. The function takes the initial time and adds a random fraction of the difference between initial and final times.
*/
FoodTruck.prototype.create3RandomStopPoints = function(pos, map) {
  for (var i = 0; i < 3; i++){
    this.randomizeStopPoint(pos, map);
  }
};

/*
specificStopPoint takes the users postion and the google map(needs the bounds of the map) to randomly distribute the foodtrucks around the user within the bounds of the map. The radius of the circular distribution area is constrained by the smallest dimension of the map - 1/2 height of the custom markers.
*/
FoodTruck.prototype.specificStopPoint = function(pos, map, now) {
  var dayOver = 22 * 3600; //the food trucks last stop begins at 22 hours
  var bounds = map.getBounds();

  var boundLat = bounds.getNorthEast().lat()-bounds.getSouthWest().lat();
  var boundLng = bounds.getNorthEast().lng()-bounds.getSouthWest().lng();

  var boundLatLng = Math.abs(boundLat) <= Math.abs(boundLng) ? boundLat : boundLng;

  var recenterFoodTrucks = Math.abs(boundLat - boundLng)/2;

  var initialTime = this.schedule.length > 0 ? this.schedule[this.schedule.length-1].endtime.getSecs()+3600 : 28800; //Gives at least a 30minute buffer till the next stop.
  if (initialTime < dayOver){
    var time = initialTime; //Determines when the next stop occurs
    //console.log(time);s
    var stime = new TimeHelper();
    stime.initSecs(time);
    var etime = new TimeHelper();
    etime.initSecs(time + 3600 * 2);
    this.schedule.push({
      lat: bounds.getSouthWest().lat() + boundLatLng * Math.random() + recenterFoodTrucks,
      lng: bounds.getSouthWest().lng() + boundLatLng * Math.random(),
      starttime: stime,
      endtime: etime
    });
    //console.log(this);
  }
};

FoodTruck.prototype.create3SpecificStopPoints = function(pos, map) {
  for (var i = 0; i < 3; i++){
    this.specificStopPoint(pos, map, aboutMy.now);
  }
};


FoodTruck.prototype.getDirections = function(){
  this.directionsService = new google.maps.DirectionsService();
  //this.directionsDisplay = new google.maps.DirectionsRenderer;
  //this.directionsDisplay.setMap(map);
  //console.log(this)
};


/*
calculateAndDisplayRoute pushes a FoodTrucks intermediate stops into the
waypoints array then requests a route be created from google.
*/
FoodTruck.prototype.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
  this.pathsRemaining = this.schedule.length-1;
  this.position.lat = this.schedule[0].lat;
  this.position.lng = this.schedule[0].lng;
  if (this.schedule.length > 1) {
    for (var i = 1; i < this.schedule.length; i++) {
      this.styleFoodTruckPath(i,directionsService, directionsDisplay);
    }
  }
  //$('.container-map').css('opacity', 1.0);
};


FoodTruck.prototype.styleFoodTruckPath = function(icopy,directionsService,directionsDisplay){
  var that = this;
  console.log(icopy);
  directionsService.route(
    {
      origin: new google.maps.LatLng(that.schedule[icopy-1].lat, that.schedule[icopy-1].lng),
      destination: new google.maps.LatLng(that.schedule[icopy].lat, that.schedule[icopy].lng),
      //waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING
    },
    function(response, status) {

      if (status === google.maps.DirectionsStatus.OK) {
        that.setResponses(icopy - 1, response);

        var flightPath = new google.maps.Polyline({
          path: response.routes[0].overview_path,
          geodesic: true,
          strokeColor: getColor(),
          strokeOpacity: 0.5,
          strokeWeight: (that.schedule.length - icopy) * 3
        });
        //flightPath.setMap(that.map);
        that.flightPaths.push(flightPath);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
      --that.pathsRemaining;
      if (that.pathsRemaining <= 0){
        that.determinePosition(new Date());
      }
    }
  );
};




function differentWidth(value){
    return function(){
      console.log(value * 5);
      return (value * 5);
    };
}

function getColor(){
    return '#'+Math.floor(Math.random() * 16777215).toString(16);
}

function vectorize(overview_path) {
  var vectors = [];
  vectors.push({
    lat: 0,
    lng: 0
  });
  for (var i = 1; i < overview_path.length; i++) {
    vectors.push({
      lat: overview_path[i].lat() - overview_path[i-1].lat(),
      lng: overview_path[i].lng() - overview_path[i-1].lng()
    });
  }
  return vectors;
}

FoodTruck.prototype.setResponses = function(index, directionResponse){
  this.responses[index] = directionResponse;
};

FoodTruck.prototype.determinePosition = function(now) {
  var nowSecs = now.getHours()*3600 + now.getMinutes()*60;
  this.pinPoint(nowSecs);
    console.log(this);

  if (this.responses.length > 0 && this.traveling && this.currentEvent > 0 && this.currentEvent < this.schedule.length) {
    var direction = this.currentEvent - 1;
    var beginDrive = this.schedule[this.currentEvent-1].endtime.seconds;
    var finishDrive = this.schedule[this.currentEvent].starttime.seconds;
    var totalDriveTime = finishDrive-beginDrive;
    var currentDriveTime = nowSecs-beginDrive;
    var directionLength = this.responses[direction].routes[0].overview_path.length;
    var directionPosition = Math.floor(currentDriveTime/totalDriveTime*directionLength);
/*
    console.log('current event ' + this.currentEvent)
    console.log('direction ' + direction);
    console.log(this);
    console.log(this.responses);
    console.log(beginDrive);
    console.log(finishDrive);
    console.log(totalDriveTime);
    console.log(currentDriveTime);
    console.log(directionPosition);
*/
    this.position.lat = (this.responses[direction].routes[0].overview_path[directionPosition].lat());
    this.position.lng = (this.responses[direction].routes[0].overview_path[directionPosition].lng());

  } else if (this.currentEvent < this.schedule.length) {
    this.position.lat = this.schedule[this.currentEvent].lat;
    this.position.lng = this.schedule[this.currentEvent].lng;
  }

  //this.render();

};

FoodTruck.prototype.pinPoint = function(nowSecs) {
  var that = this;
  this.traveling = true;
  for (var i = 0; i < that.schedule.length; i++) {
    if (nowSecs < that.schedule[i].starttime.getSecs() ){
      that.currentEvent = i;
      i = that.schedule.length;
    }else if (nowSecs > that.schedule[i].starttime.getSecs() && nowSecs < that.schedule[i].endtime.getSecs()){
      that.currentEvent = i;
      that.traveling = false;
      i = that.schedule.length;
    } else {
      that.currentEvent = i+1;
    }
  }
};

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

FoodTruck.prototype.getSchedule = function() {
  return this.schedule;
};
FoodTruck.prototype.addToSchedule = function(data) {
  this.schedule.push(data);
};
FoodTruck.prototype.removeFromSchedule = function(index) {
  this.schedule.splice(index,1);
};
FoodTruck.prototype.updateSchedule = function(index,data) {
  this.schedule.splice(index,1,data);
};
FoodTruck.prototype.clearSchedule = function(){
  this.scedule = [];
};
FoodTruck.prototype.render = function(viewModel, map) {
//  console.log(this);
//  console.log(this.currentEvent);
  var icon = this.img;
  if (this.traveling){
    icon = this.tImg;
  }

  this.marker = new google.maps.Marker({
    position: new google.maps.LatLng(this.position.lat, this.position.lng),
    map: map,
    title: this.name,
    icon: icon,
    draggable: false
  });

  var contentString = '<div id="content">'+
    '<h3 id="heading" class="heading">' + this.name + '</h3>' +
    '<div id="body-content"> ' + this.description + '</div>' +
    '</div>';

  this.infowindow = new google.maps.InfoWindow({
    content: contentString,
    position: this.marker.position
  });

  this.infowindow.addListener('closeclick', function () {
    //this.marker.setOpacity(0.5);
    //this.flightPath.setMap(null);
    //viewModel.selectedDestination = {};
  }.bind(this));


  this.marker.addListener('click', function() {
    console.log(this);
    viewModel.foodTrucks().forEach( function(foodTruck){
      if(foodTruck.infowindow){
        foodTruck.infowindow.close();
        //foodTruck.marker.setOpacity(0.5);
      }
      if (foodTruck.flightPaths.length > 0){
        foodTruck.flightPaths.forEach( function (path){
          path.setMap(null);
        });
      }
    });
    if (this.name) {
      viewModel.description('<h4 id="heading" class="heading">' + this.name + '</h4>');
    }
    if(this.description){
      viewModel.description(viewModel.description() + this.description);
    }
//    this.infowindow.open(map, this.marker);
    this.flightPaths.forEach( function (path){
      path.setMap(map);
    });
    viewModel.selectedTruckName(this.name);
  }.bind(this));

};

FoodTruck.prototype.keepChosen = function(map, viewModel){
  viewModel.foodTrucks().forEach( function(foodTruck){
    if(foodTruck.infowindow){
      foodTruck.infowindow.close();
    }
    if (foodTruck.flightPaths.length > 0){
      foodTruck.flightPaths.forEach( function (path){
        path.setMap(null);
      });
      console.log(foodTruck);
    }
    if (foodTruck.marker){
      foodTruck.marker.setMap(null);
    }
    //console.log(meetup.marker)
  });
  this.marker.setMap(map);
  this.flightPath.setMap(map);
  //this.marker.setMap(map);
};


/*
this is an approximation of the actual position of the food truck. The calculation is the number of seconds traveling over the number of seconds between stops. This obviously doesnt give the real life position, It is mainly used to link a route to a food truck and give a visual countdown.
*/


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
};


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
};




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
};



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
};
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
};*/

