function initialize(){console.log(Modernizr),Modernizr.geolocation&&(console.log("geolocation available"),navigator.geolocation.getCurrentPosition(function(a){aboutMy.position=new google.maps.LatLng(a.coords.latitude,a.coords.longitude),console.log(aboutMy.position);var b={center:aboutMy.position,zoom:16,mapTypeId:google.maps.MapTypeId.ROADMAP,disableDefaultUI:!0};map=new google.maps.Map(document.getElementById("map-canvas"),b),map.setOptions({styles:noPoi}),console.log("position"+aboutMy.position);new google.maps.Marker({position:aboutMy.position,map:map,title:"Current Location"})},function(){console.log("err")}))}var aboutMy={position:{},searches:[],markers:[],weather:{}};$("#open-menu").click(function(){$(".top-input").removeClass("hidden-offscreen-left"),$(".search-bar").focus()}),$("#open-menu").focus(function(){$(this).blur()}),$(".search-bar").blur(function(){$(".top-input").addClass("hidden-offscreen-left"),setInterval(function(){$("#open-menu").prop("disabled",!1)},1e3)}),$("#open-list").click(function(){$(".left").removeClass("hidden-offscreen-left")}),$("#open-list").focus(function(){$(this).blur()}),$(".search-bar").blur(function(){$(".left").addClass("hidden-offscreen-left"),setInterval(function(){$("#open-list").prop("disabled",!1)},1e3)}),google.maps.event.addDomListener(window,"load",initialize);var map,noPoi=[{featureType:"poi",stylers:[{visibility:"off"}]}],POI=function(a){this.name=ko.observable(a.name)},ViewModel=function(){var a=this;this.query=ko.observable(""),this.pois=ko.observableArray([]),a.neighborhoodSearch=function(){var b={location:aboutMy.position,radius:"500",types:["store"]},c=new google.maps.places.PlacesService(map);c.nearbySearch(b,a.searchCallback)},a.createPlaceMarker=function(a){console.log(aboutMy.markers),aboutMy.markers.push(new google.maps.Marker({position:a.geometry.location,map:map,title:a.name}))},a.searchCallback=function(b,c){if(aboutMy.markers=[],c==google.maps.places.PlacesServiceStatus.OK)for(var d=0;d<b.length;d++){{b[d]}a.createPlaceMarker(b[d])}b.forEach(function(b){a.pois.push(new POI(b))}),a.pois.sort()}};ko.applyBindings(new ViewModel);