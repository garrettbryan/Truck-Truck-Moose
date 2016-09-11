//https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=-78.6546647&limited_events=False&photo-host=public&page=20&radius=25.0&lat=35.609941&desc=False&status=upcoming&sig_id=130469302&sig=51aa090d729c94f98913b7aeb0da1fb21e624354

//1day
//https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=" + position.lng() + "&limited_events=False&photo-host=public&page=20&time=%2C1d&radius=25.0&lat=" + position.lat() + "&desc=False&status=upcoming&sig_id=130469302&sig=6ebd2b264bedf38cb1e1af50ef292c0e2eeda64d

//"https://api.meetup.com/2/open_events?&lon=" + position.lng() + "&lat=" + position.lat() + "&and_text=False&offset=0&format=json&limited_events=False&photo-host=public&page=20&radius=25.0&fields=group_photos&desc=False&status=upcoming&sig_id=130469302&sig=c5d02f906044717fbe2aa757f96e14dfddff4e0f";

//"https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=" + position.lng() + "&limited_events=False&photo-host=public&page=20&time=%2C1d&radius=25.0&lat=" + position.lat() + "&desc=False&status=upcoming&sig_id=130469302&sig=6ebd2b264bedf38cb1e1af50ef292c0e2eeda64d"


var MeetupRequest = function() {
  this.data = {};
};

var Meetup = function() {
};

Meetup.prototype.init = function(data) {
  for (var i in data) {
    this[i] = data[i];
  }
//  console.log(this);
  this.img = 'images/resize_meetup.png';
};

Meetup.prototype.render = function() {
  if (this.venue){
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.venue.lat, this.venue.lon),
      map: map,
      icon: this.img,
      title: this.group.name
    });
    var contentString = '<div id="content">'+
      '<h3 id="heading" class="heading">' + this.group.name + '</h3>' +
      '<div id="body-content"> ' + this.description + '</div>' +
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      position: this.marker.position
    });

    this.marker.addListener('click', function() {
      infowindow.open(map, this.marker);
    });
  }
};
