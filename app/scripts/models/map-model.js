var Map = function(){
  this.markers = [];
  this.path = [];
};






function initialize() {
  console.log(Modernizr);

  if (Modernizr.geolocation) {
    console.log("geolocation available");
    /*
    https://developer.mozilla.org/en-US/docs/Web/API/Geolocation
    navigator.geolocation.getCurrentPosition(success[, error[, options]])
      success callback that takes Position object as input parameter
      Position.coords is a Coordinates object
        dbl latitude decimal degrees
        dbl longitude decimal degrees
        dbl altitude relative to sea level in meters can be null
        dbl accuracy of latitude longitude in meters
        dbl altitudeAccuracy expressed in meters.
        dbl heading 0 is north, 90 is east, speed is 0 then NaN, If unable to determine then null
        dbl speed velocity in meters per second
      Position.timestamp is a DOMTimeStamp
        precision to the milisecond

      error callback that takes PositionError object as input parameter
        1 PERMISSION_DENIED
        2 POSITION_UNAVAILABLE device internal error
        3 TIMEOUT PostionOptions. timeout reached.

      options
        bool PositionOptions.enableHighAccuracy
        positive long PositionOptions.timeout miliseconds
        positive long PositionOptions.maximumAge milliseconds for cached postion to be returned.
    */
    navigator.geolocation.getCurrentPosition(
      /*Success callback uses the returned latitude and longitude to initialize a google map.
      */
      function(pos){
        aboutMy.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
//        console.log(aboutMy.position);

        //var directionsService = new google.maps.DirectionsService;
        //var directionsDisplay = new google.maps.DirectionsRenderer;

        var mapOptions = {
          center: aboutMy.position,
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
        map.setOptions({styles: noPoi});

        console.log("position" + aboutMy.position);

        google.maps.event.addListenerOnce(map, 'bounds_changed', function(){

 //         var meetupRequest = new MeetupRequest();
 //         meetupRequest.CORopenEvents(aboutMy.position);


/*
          foodTrucks.forEach(function(truckData){
            var truck = new FoodTruck();
            truck.initNoSchedule(truckData);
            truck.create3RandomStopPoints(aboutMy.position, map)
            truck.determinePosition(aboutMy.now);
            truck.render();
          });
*/

          /*
          Map should turn on only if google maps is online.
          */
          //$('.container-map').css('opacity', 1.0);
        });

        /*
        verify the marker anchor is appropriate
        */
        var marker1 = new google.maps.Marker({
          position: aboutMy.position,
          map: map,
          title: "Current Location",
          draggable:false
        });

        /*
        add an info window
        */
        var contentString = '<div id="content">'+
          '<h3 id="heading" class="heading">A Heading</h3>' +
          '<div id="body-content"> This is something interesting</div>' +
          '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        marker1.addListener('click', function() {
          infowindow.open(map, marker1);
        });


        /* incorporate google auto complete
        https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch
        */

        var places, infoWindow;
        var markers = [];
        var autocomplete;
        var countryRestrict = {'country': 'us'};



        //autocomplete = new google.maps.places.AutocompleteService();
        // Create the autocomplete object and associate it with the UI input control.
        // Restrict the search to the default country, and to place type "cities".


        /*
        autocomplete = new google.maps.places.Autocomplete(
        // @type {!HTMLInputElement}  (
          document.getElementById('search-bar')), {
          types: ['(cities)'],
          componentRestrictions: countryRestrict
          });
        places = new google.maps.places.PlacesService(map);

        //autocomplete.addListener('place_changed', onPlaceChanged);

        // Add a DOM event listener to react when the user selects a country.
        //document.getElementById('country').addEventListener(
        //'change', setAutocompleteCountry);

        // Search for hotels in the selected city, within the viewport of the map.
        function search() {
          var search = {
            bounds: map.getBounds(),
            types: ['lodging']
          };
          console.log(bounds);
          places.nearbySearch(search, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              clearResults();
              clearMarkers();
              // Create a marker for each hotel found, and
              // assign a letter of the alphabetic to each marker icon.
              for (var i = 0; i < results.length; i++) {
                var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
                var markerIcon = MARKER_PATH + markerLetter + '.png';
                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                  position: results[i].geometry.location,
                  animation: google.maps.Animation.DROP,
                  icon: markerIcon
                });
                // If the user clicks a hotel marker, show the details of that hotel
                // in an info window.
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);
              }
            }
          });
        }


        function clearMarkers() {
          for (var i = 0; i < markers.length; i++) {
            if (markers[i]) {
              markers[i].setMap(null);
            }
          }
          markers = [];
        }

        function dropMarker(i) {
          return function() {
            markers[i].setMap(map);
          };
        }


        function addResult(result, i) {
          var results = document.getElementById('results');
          var markerLetter = String.fromCharCode('A'.charCodeAt(0) + i);
          var markerIcon = MARKER_PATH + markerLetter + '.png';

          var tr = document.createElement('tr');
          tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
          tr.onclick = function() {
            google.maps.event.trigger(markers[i], 'click');
          };

          var iconTd = document.createElement('td');
          var nameTd = document.createElement('td');
          var icon = document.createElement('img');
          icon.src = markerIcon;
          icon.setAttribute('class', 'placeIcon');
          icon.setAttribute('className', 'placeIcon');
          var name = document.createTextNode(result.name);
          iconTd.appendChild(icon);
          nameTd.appendChild(name);
          tr.appendChild(iconTd);
          tr.appendChild(nameTd);
          results.appendChild(tr);
        }

        function clearResults() {
          var results = document.getElementById('results');
          while (results.childNodes[0]) {
            results.removeChild(results.childNodes[0]);
          }
        }
}
*/








      },
      /*failure callback returns err
      TODO make this better
      */
      function(){
        console.log("err");
      }
    );
  }

  //401 and tenten 35.665270, -78.699227
  //home 35.798124, -78.666578
  //console.log(map);
}