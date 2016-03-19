var map,
  autocomplete,
  predictions,
  predictionList,
  autocompletePredictions = [];

var noPoi = [
  {
    featureType: "poi",
    stylers: [
      { visibility: "off" }
    ]
  }
];

var POI = function(place) {
  this.name = ko.observable(place.name);
};

var prediction = function(place) {
  this.details = ko.observable(place);
};

var ViewModelNG = function() {
  var self = this;

  this.details = ko.observable();

  this.signIn = function(formElement) {
    console.log(formElement);
  };

  this.signUp = function() {
    console.log("signUp");
  };



  this.query = ko.observable("");
  this.pois = ko.observableArray([]);
  this.predictions = ko.observableArray([]);

  $('.search-bar').keyup(function(){
    autocomplete.getPlacePredictions({
      input: self.query(),
      location: aboutMy.position,
      radius: '500'
      }, autocompleteCallback);
    console.log(self.query());
  });

  self.neighborhoodSearch = function() {
    deleteMarkers();
    self.pois([]);
    var request = {
      location: aboutMy.position,
      radius: '500',
      keyword: self.query()
    };

    console.log(request.keyword);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, self.searchCallback);
  };

  self.createPlaceMarker = function(place){
    console.log(aboutMy.markers);
    aboutMy.markers.push(new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name
    }));
  };

  self.searchCallback = function(results, status) {
    aboutMy.markers = [];
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        //console.log(results[i]);
        self.createPlaceMarker(results[i]);
      }
    }
    results.forEach(function(result){
      self.pois.push(new POI(result) );
    });
    self.pois.sort();
  };
};



function autocompleteCallback(predictions, status) {
  autocompletePredictions = "";
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    alert(status);
    return;
  }
  console.log(predictions);
  predictions.forEach(function(prediction){
    autocompletePredictions += "<li>" + prediction.description + "</li>";
  });
  $('.prediction-list').html(autocompletePredictions);
}


function setAllMap(map) {
  aboutMy.markers.forEach(function(marker){
    marker.setMap(map);
  });
}

function clearMarkers() {
  setAllMap(null);
}

function deleteMarkers() {
  clearMarkers();
  aboutMy.markers = [];
}

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
