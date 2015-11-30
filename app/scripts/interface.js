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

function initialize() {
  console.log(Modernizr);

  if (Modernizr.geolocation) {
    console.log("geolocation available");
    navigator.geolocation.getCurrentPosition(
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

        var marker = new google.maps.Marker({
          position: aboutMy.position,
          map: map,
          title: "Current Location"
        });

        autocomplete = new google.maps.places.AutocompleteService();

      },
      function(){
        console.log("err");
      });
  }

  //401 and tenten 35.665270, -78.699227
  //home 35.798124, -78.666578
  //console.log(map);
}

google.maps.event.addDomListener(window, 'load', initialize);