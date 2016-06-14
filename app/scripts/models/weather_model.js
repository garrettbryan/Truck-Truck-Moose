/*

http://api.wunderground.com/api/ec12cd13256c67c5/animatedradar/q/MI/Ann_Arbor.gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50




Using lat/lon bounds to determine a box
http://api.wunderground.com/api/ec12cd13256c67c5/radar/image.gif?maxlat=42.35&maxlon=-109.311&minlat=39.27&minlon=-114.644&width=600&height=480&newmaps=1

http://api.wunderground.com/api/ec12cd13256c67c5/radar/image.gif?maxlat=35.693&maxlon=-78.589&minlat=35.526&minlon=-78.719&width=600&height=480&newmaps=1

35.6930034910276,-78.58935914606934

35.52678677214099,-78.71999345393067


/Using lat/lon bounds, showing time label, transparent background
http://api.wunderground.com/api/ec12cd13256c67c5/radar/image.gif?maxlat=35.570&maxlon=-78.627&minlat=35.649&minlon=-78.682&width=640&height=480&rainsnow=1&timelabel=1&timelabel.x=525&timelabel.y=41&reproj.automerc=1

http://api.wunderground.com/api/ec12cd13256c67c5/radar/image.gif?maxlat=35.570&maxlon=-78.627&minlat=35.649&minlon=-78.682&width=640&height=480&rainsnow=1&timelabel=1&timelabel.x=525&timelabel.y=41&reproj.automerc=1

http://api.wunderground.com/api/ec12cd13256c67c5/radar/image.gif?maxlat=35.693&maxlon=-78.589&minlat=35.526&minlon=-78.719&width=760&height=1191&rainsnow=1&timelabel=1&timelabel.x=525&timelabel.y=41&reproj.automerc=1

http://api.wunderground.com/api/ec12cd13256c67c5/animatedradar/image.gif?maxlat=35.693&maxlon=-78.589&minlat=35.526&minlon=-78.719&width=760&height=1191&rainsnow=1&reproj.automerc=1&num=5&delay=50&timelabel=1&timelabel.x=525&timelabel.y=41

*/

var WeatherUnderground = function(){
  //this.overlay = {};
  this.mapBounds = {};
  this.divWidth = 0;
  this.divHeight = 0;
};

WeatherUnderground.prototype.setDimensions = function(map){
  this.mapBounds  = {
    north: map.getBounds().getNorthEast().lat(),
    south: map.getBounds().getSouthWest().lat(),
    east: map.getBounds().getNorthEast().lng(),
    west: map.getBounds().getSouthWest().lng(),
  };
  /*
  var mapBounds = {
    north: 35.693,
    south: 35.526,
    east: -78.589,
    west: -78.719
  };
  */
  this.divWidth = document.getElementById('map-canvas').clientWidth;
  this.divHeight = document.getElementById('map-canvas').clientHeight;
};

WeatherUnderground.prototype.render = function(map){
  this.overlay = new google.maps.GroundOverlay('http://api.wunderground.com/api/ec12cd13256c67c5/animatedradar/image.gif?maxlat=' + this.mapBounds.north + '&maxlon=' + this.mapBounds.east + '&minlat=' + this.mapBounds.south + '&minlon=' + this.mapBounds.west + '&width=' +this.divWidth + '&height=' + this.divHeight + '&rainsnow=1&num=5&delay=50&timelabel=1&timelabel.x=525&timelabel.y=41&smooth=1', this.mapBounds);
  this.overlay.setMap(map);
};

WeatherUnderground.prototype.removeRadar = function(map) {
  if (this.overlay) {
    this.overlay.setMap(null);
  }
};