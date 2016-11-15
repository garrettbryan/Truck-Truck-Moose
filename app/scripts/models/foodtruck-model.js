 /*
foodtruck-model.js contains all the code related to the foodtrucks. The schedule is an array of objects of stoptimes in 24hour timestamps and stoppoints given in latitude and longitude. The stop times should not overlap. The Foodtrucks will be indicated on the map at various times. Having a future postion will allow users to plan a rendezvous
{
  lat: x,
  lng: y,
  startTime: T0,
  endTime: T1
};
*/


/*
FoodTruckRequest is the class of object that makes requests to the TTM server.
*/
FoodTruckRequest = function() {
  this.data = {};
};

/*
The server request from getFoodTrucks first initializes the foodtruck and then builds out many of its attributes from the returned JSON.
*/
FoodTruckRequest.prototype.getFoodTrucks = function(cb){
  var err = null;
  var foodTruckTimeout = setTimeout(function(){
    this.warningMessages.unshift('Looks like the Truck Truck Moose server is taking too long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while');
  }.bind(this), 8000);
  $.ajax.call(this,{
      url: 'https://fast-basin-67072.herokuapp.com/trucks',
      dataType: 'jsonp',
      success: function(data) {
        clearTimeout(foodTruckTimeout);
        if (data.length === 0) {
          this.warningMessages.unshift("heard from Truck Truck Moose, there are no more local trucks today");
          this.warning(true);
        } else {
          data.forEach(function(truckData){
            var truck = new FoodTruck();
            truck.initNoSchedule(truckData,this.map);
            truck.create3RandomStopPoints(this.selectedDestination, this.map);
            truck.getDirections();
            truck.calculateAndDisplayRoute(truck.directionsService, truck.directionsDisplay);
            truck.render(this, this.map);
            truck.initRandomMenu();
            this.foodTrucks.push(truck);
          }.bind(this));
          this.foodTrucksAdded = true;
          cb(err);
        }
      }.bind(this),
      error: function(data) {
        clearTimeout(foodTruckTimeout);
        this.warningMessages.unshift("There's been an error contacting the Truck Truck Moose Server.\nPlease try again later");
        this.warning(true);
        cb(err);
      }.bind(this)
  });
};

/*
Initialize a foodTruck without a schedule
*/
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

/*
Create a random menu with varioius dishes
*/
FoodTruck.prototype.initRandomMenu = function(){
  this.menuOfferings.forEach(function(offering){
    this.dailyMenu.push(new Dish(makeRandomMenuItem(offering)));
  }, this);
};


/*
randomizeStopPoint takes the users postion and the google map(needs the bounds of the map) to randomly distribute the foodtrucks around the user within the bounds of the map. The radius of the circular distribution area is constrained by the smallest dimension of the map - 1/2 height of the custom markers.
*/
FoodTruck.prototype.randomizeStopPoint = function(dest, map) {
  var dayOver = 24 * 60 * 60; //the food trucks last stop begins at 24 hours

  var bounds = map.getBounds();

  var randomRadius = 3000 * Math.random();
  var randomHeading = 360 * Math.random();
  var randomPt = google.maps.geometry.spherical.computeOffset(dest.marker.position, randomRadius, randomHeading);

//Gives at least a 30minute buffer till the next stop.
  var initialTime = this.schedule.length > 0 ? this.schedule[this.schedule.length-1].endtime.getSecs()+1800 : 0;

//Determines when the next stop occurs
  var time = initialTime + Math.random()*(dayOver-initialTime);

  var stime = new TimeHelper();
  stime.initSecs(time);
  var etime = new TimeHelper();
  etime.initSecs(time + 3600);

  this.schedule.push({
    lat: randomPt.lat(),
    lng: randomPt.lng(),
    starttime: stime,
    endtime: etime
  });
};

/*
Foodtrucks have 3  randomized 1 hour stops unless the end of day is reached. The function takes the initial time and adds a random fraction of the difference between initial and final times.
*/
FoodTruck.prototype.create3RandomStopPoints = function(dest, map) {
  for (var i = 0; i < 3; i++){
    this.randomizeStopPoint(dest, map);
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
    var time = initialTime;
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
  }
};


FoodTruck.prototype.create3SpecificStopPoints = function(pos, map) {
  for (var i = 0; i < 3; i++){
    this.specificStopPoint(pos, map, aboutMy.now);
  }
};


FoodTruck.prototype.getDirections = function(){
  this.directionsService = new google.maps.DirectionsService();
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


/*
Style the foodtrucck's flight path when selected
*/
FoodTruck.prototype.styleFoodTruckPath = function(index,directionsService,directionsDisplay){
  var that = this;
  directionsService.route(
    {
      origin: new google.maps.LatLng(that.schedule[index-1].lat, that.schedule[index-1].lng),
      destination: new google.maps.LatLng(that.schedule[index].lat, that.schedule[index].lng),
      //waypoints: waypoints,
      travelMode: google.maps.TravelMode.DRIVING
    },
    function(response, status) {

      if (status === google.maps.DirectionsStatus.OK) {
        that.setResponses(index - 1, response);

        var flightPath = new google.maps.Polyline({
          path: response.routes[0].overview_path,
          geodesic: true,
          strokeColor: '#E52020',
          strokeOpacity: that.strokeOpacity(),
          strokeWeight: (that.schedule.length - index) * 3
        });
        //flightPath.setMap(that.map);
        that.flightPaths.push(flightPath);
      } else {
        //this.warningMessages.unshift('Unable to access Google\'s Direction Service\n' + status);
      }
      --that.pathsRemaining;
      if (that.pathsRemaining <= 0){
        that.determinePosition(new Date());
      }
    }
  );
};


FoodTruck.prototype.strokeOpacity = function(){
  return (this.pathsRemaining/(this.schedule.length-1));
};


FoodTruck.prototype.colorPath = function(){
  //#E52020 redcolor
    return '#'+Math.floor(Math.random() * 16777215).toString(16);
};


FoodTruck.prototype.setResponses = function(index, directionResponse){
  this.responses[index] = directionResponse;
};

/*
determinePosition will calculate the intermediate point for the food truch as it travels to it's next stop.
TODO finish this
*/
FoodTruck.prototype.determinePosition = function(now) {
  var nowSecs = now.getHours()*3600 + now.getMinutes()*60;
  this.isTruckTraveling(nowSecs);

  if (this.responses.length > 0 && this.traveling && this.currentEvent > 0 && this.currentEvent < this.schedule.length) {
    var direction = this.currentEvent - 1;
    var beginDrive = this.schedule[this.currentEvent-1].endtime.seconds;
    var finishDrive = this.schedule[this.currentEvent].starttime.seconds;
    var totalDriveTime = finishDrive-beginDrive;
    var currentDriveTime = nowSecs-beginDrive;
    var directionLength = this.responses[direction].routes[0].overview_path.length;
    var directionPosition = Math.floor(currentDriveTime/totalDriveTime*directionLength);

    this.position.lat = (this.responses[direction].routes[0].overview_path[directionPosition].lat());
    this.position.lng = (this.responses[direction].routes[0].overview_path[directionPosition].lng());

  } else if (this.currentEvent < this.schedule.length) {
    this.position.lat = this.schedule[this.currentEvent].lat;
    this.position.lng = this.schedule[this.currentEvent].lng;
  }
};

/*
isTruckTraveling determines if the truck is currently traveling
*/
FoodTruck.prototype.isTruckTraveling = function(nowSecs) {
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

/*
render renders the foodtruck icon to the map and wires up the event listeners
*/
FoodTruck.prototype.render = function(viewModel, map) {
  var icon = this.img;
  if (this.traveling){
    //icon = this.tImg;
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
    viewModel.foodTrucks().forEach( function(foodTruck){
      if(foodTruck.infowindow){
        foodTruck.infowindow.close();
        foodTruck.marker.setOpacity(0.5);
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
      this.schedule.forEach( function(stop, i) {
        var stopnum = i + 1;
        viewModel.description(viewModel.description() +'<br>' + stopnum + '. Open at ' + stop.starttime.convertToTime());
        viewModel.description(viewModel.description() + ' - Close at ' + stop.endtime.convertToTime());
      });

    }
    this.marker.setOpacity(1.0);
    this.flightPaths.forEach( function (path){
      path.setMap(map);
    });
    viewModel.selectedTruckName(this.name);
    viewModel.readyForNextScreen(true);
  }.bind(this));
};

/*
keepChosen remove all other foodtrucks from map and activate the marker and flightpath of selected foodtruck
*/
FoodTruck.prototype.keepChosen = function(map, viewModel){
  viewModel.foodTrucks().forEach( function(foodTruck){
    if(foodTruck.infowindow){
      foodTruck.infowindow.close();
    }
    if (foodTruck.flightPaths.length > 0){
      foodTruck.flightPaths.forEach( function (path){
        path.setMap(null);
      });
    }
    if (foodTruck.marker){
      foodTruck.marker.setMap(null);
    }
  });
  this.marker.setMap(map);
  this.flightPaths.forEach( function (path){
    path.setMap(map);
  });
};

/*
keepChosen remove all other foodtrucks from map and activate the marker and flightpath of selected foodtruck
*/
FoodTruck.prototype.removeMapMarks = function(map, viewModel){
  viewModel.foodTrucks().forEach( function(foodTruck){
    if(foodTruck.infowindow){
      foodTruck.infowindow.close();
    }
    if (foodTruck.flightPaths && foodTruck.flightPaths.length > 0){
      foodTruck.flightPaths.forEach( function (path){
        path.setMap(null);
      });
    }
    if (foodTruck.marker){
      foodTruck.marker.setMap(map);
    }
  });
};