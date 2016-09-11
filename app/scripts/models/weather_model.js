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
  this.divWidth = document.getElementById('map-canvas').clientWidth;
  this.divHeight = document.getElementById('map-canvas').clientHeight;
};

WeatherUnderground.prototype.render = function(map){
  this.overlay = new google.maps.GroundOverlay('http://api.wunderground.com/api/ec12cd13256c67c5/animatedradar/image.gif?maxlat=' + this.mapBounds.north + '&maxlon=' + this.mapBounds.east + '&minlat=' + this.mapBounds.south + '&minlon=' + this.mapBounds.west + '&width=' +this.divWidth + '&height=' + this.divHeight + '&rainsnow=1&num=5&delay=50&timelabel=1&timelabel.x=525&timelabel.y=41&smooth=1', this.mapBounds, {opacity: 0.5});
  this.overlay.setMap(map);
};

WeatherUnderground.prototype.removeRadar = function(map) {
  if (this.overlay) {
    this.overlay.setMap(null);
  }
};