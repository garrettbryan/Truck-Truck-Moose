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
  this.name = "";
  this.description = "";
  this.img = "";
  this.schedule = [];
  this.comments = [];
}

FoodTruck.prototype.initializeNoScedule = function(truckData){
  this.name = truckData.name;
  this.description = truckData.description;
  this.img = truckData.img;
}

/*
randomizeStopPoint takes the users postion and the google map(needs the bounds of the map) to randomly distribute the foodtrucks around the user within the bounds of the map. The radius of the circular distribution area is constrained by the smallest dimension of the map - 1/2 height of the custom markers.
*/
FoodTruck.prototype.randomizeStopPoint = function(pos, map) {
  //function locallyRandomizeFoodTruck(bounds, pos) {
  //determine bounds of google map.
  //randomize the local position of the food trucks within the bounds.
  //function to place food trucks is D0+(D1-D0)*random(0|1)
  //Food trucks should be constrained to streets.
  //constrain random placement to smallest dimension of screen
  var bounds = map.getBounds();

  var boundLat = bounds.getNorthEast().lat()-bounds.getSouthWest().lat();
  var boundLng = bounds.getNorthEast().lng()-bounds.getSouthWest().lng();

  var boundLatLng = Math.abs(boundLat) <= Math.abs(boundLng) ? boundLat : boundLng;

  var recenterFoodTrucks = Math.abs(boundLat - boundLng)/2;

  var initialTime = this.schedule[this.schedule.length-1] || 0


    var initialTime = 0;
    for (var i = 0; i < 3; i++){
      var time = initialTime + Math.random()*(20-initialTime);
      truck.locTime.push({
        randomLat: bounds.getSouthWest().lat() + boundLatLng * Math.random() + recenterFoodTrucks,
        randomLng: bounds.getSouthWest().lng() + boundLatLng * Math.random(),
        starttime: time,
        endtime: time + 1
      });
      initialTime = truck.locTime[i].endtime + .5 //possibl

      truck.marker = new google.maps.Marker({
        position: new google.maps.LatLng(truck.locTime[0].randomLat, truck.locTime[0].randomLng),
        map: map,
        title: truck.name,
        icon: truck.img,
        draggable:true
      });
    }
  });
}



}

FoodTruck.prototype.create3RandomStopPoints = function() {
  var geocoder = new google.maps.Geocoder;



  aboutMy.foodTrucks.forEach(function(truck){
    /*
    Foodtrucks have 3  randomized 1 hour stops.
    The function takes the initial time and adds a random fraction of the difference between initial and
    final times.
    */
    var initialTime = 0;
    for (var i = 0; i < 3; i++){
      var time = initialTime + Math.random()*(20-initialTime);
      truck.locTime.push({
        randomLat: bounds.getSouthWest().lat() + boundLatLng * Math.random() + recenterFoodTrucks,
        randomLng: bounds.getSouthWest().lng() + boundLatLng * Math.random(),
        starttime: time,
        endtime: time + 1
      });
      initialTime = truck.locTime[i].endtime + .5 //possibl

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