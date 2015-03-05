function initialize() {
  var mapOptions = {
    center: { lat: 35.619075, lng: -78.638199},
    zoom: 21
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);