function initialize() {
  var mapOptions = {
    center: { lat: 35.619075, lng: -78.638199},
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

$("#open-menu").click(function(){
  $(".top-input").removeClass("hidden-offscreen-left");
  $(".search-bar").focus();
});

$("#open-menu").focus(function(){
  $(this).blur();
});

$(".search-bar").blur(function() {
  $(".top-input").addClass("hidden-offscreen-left");
  setInterval(function() {
    $("#open-menu").prop("disabled", false);
  }, 1000);
});


$("#open-list").click(function(){
  $(".left").removeClass("hidden-offscreen-left");
  //$(".search-bar").focus();
});

$("#open-list").focus(function(){
  $(this).blur();
});

$(".search-bar").blur(function() {
  $(".left").addClass("hidden-offscreen-left");
  setInterval(function() {
    $("#open-list").prop("disabled", false);
  }, 1000);
});

/*
I. Determine mobile or desktop.
  A.mobile
    1.orientation of the device.
    2.screen size
  B.desktop
    1. window size.
    2. allow resizes
II. Create the html elements
  A. Map
  B. Search bar
  C. Highlight Locations
  D. Third Party Data about locations.
    1. Weather underground
    2. Yelp
    3. Instagram
  E. various ways to browse the content.
    1. map pointers
    2. search
    3. list highlighting.
III. Add css flair
  A. caveman hunting in search bar.


Review our course JavaScript Design Patterns.
Download the Knockout framework.
Write code required to add a full-screen map to your page using the Google Maps API.
Write code required to add map markers identifying a number of locations you are interested in within this neighborhood.
Implement the search bar functionality to search and filter your map markers. There should be a filtering function on markers that already show up. Simply providing a search function through a third-party API is not enough.
Implement a list view of the identified locations.
Add additional functionality using third-party APIs when a map marker, search result, or list view entry is clicked (ex. Yelp reviews, Wikipedia, StreetView/Flickr images, etc). If you need a refresher on making AJAX requests to third-party servers, check out our Intro to AJAX course.

*/
