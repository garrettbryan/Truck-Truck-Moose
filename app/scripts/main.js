function initialize() {
  console.log(Modernizr);

  if (Modernizr.geolocation) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(
      function(pos){
        aboutMy.position = pos.coords;
        console.log(aboutMy.position);
        var mapOptions = {
          center: { lat: aboutMy.position.latitude, lng: aboutMy.position.longitude},
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
      },
      function(){
        console.log("err");
      });
  }

  //35.798124, -78.666578
  //console.log(map);
}

google.maps.event.addDomListener(window, 'load', initialize);




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
