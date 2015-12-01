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
The initialize function uses modernizer to test browser.
Depending on the outcome the app will gracefully downgrade.
The app will have two quality steps.
With geolocation map will load with surrounding area.
Without geolocation map will load United States map, and ask user for location.

Initialize will also initialize the random foodtrucks and their postions.
*/
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
        console.log(aboutMy.position);

        var mapOptions = {
          center: aboutMy.position,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        map.setOptions({styles: noPoi});

        console.log("position" + aboutMy.position);

        /*
        add a new image to the current location
        */
        var testImage = 'images/resize_woolly_mammoth.png';

        /*
        add current location via marker to centerpoint of map
        */
        var marker = new google.maps.Marker({
          position: aboutMy.position,
          map: map,
          title: "Current Location",
          icon: testImage
        });




        autocomplete = new google.maps.places.AutocompleteService();

      },
      /*failure callback returns err
      TODO make this better
      */
      function(){
        console.log("err");
      });
  }

  //401 and tenten 35.665270, -78.699227
  //home 35.798124, -78.666578
  //console.log(map);
}

google.maps.event.addDomListener(window, 'load', initialize);