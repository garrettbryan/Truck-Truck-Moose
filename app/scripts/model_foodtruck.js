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
  this.schedule = [];
  this.comments = [];
  this.currentEvent = 0;
}

FoodTruck.prototype.initNoSchedule = function(truckData){
  this.name = truckData.name;
  this.description = truckData.description;
  this.img = truckData.img;
}

FoodTruck.prototype.determinePosition = function(now) {
  var nowSecs = now.getHours()*3600 + now.getMinutes()*60;
  this.pinPoint(nowSecs);
  if (this.traveling && this.schedule > 0 && this.currentEvent < this.schedule.length) {
    this.position.lat = (this.schedule[this.currentEvent].lat + this.schedule[this.currentEvent - 1 ].lat)/2;
    this.position.lng = (this.schedule[this.currentEvent].lng + this.schedule[this.currentEvent - 1 ].lng)/2;
  }
}


FoodTruck.prototype.pinPoint = function(nowSecs) {
  this.traveling = true;
  for (var i = 0; i < this.schedule.length; i++) {
    if (nowSecs > this.schedule[i].starttime.getSecs() && nowSecs < this.schedule[i].endtime.getSecs()){
      this.traveling = false;
      this.currentEvent = i;
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
  if (!(this.traveling)){
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.schedule[this.currentEvent].lat, this.schedule[this.currentEvent].lng),
      map: map,
      title: this.name,
      icon: this.img,
      draggable: true
    });
  }
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