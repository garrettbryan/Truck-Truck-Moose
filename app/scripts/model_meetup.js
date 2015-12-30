//https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=-78.6546647&limited_events=False&photo-host=public&page=20&radius=25.0&lat=35.609941&desc=False&status=upcoming&sig_id=130469302&sig=51aa090d729c94f98913b7aeb0da1fb21e624354

//1day
//https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=" + position.lng() + "&limited_events=False&photo-host=public&page=20&time=%2C1d&radius=25.0&lat=" + position.lat() + "&desc=False&status=upcoming&sig_id=130469302&sig=6ebd2b264bedf38cb1e1af50ef292c0e2eeda64d



var MeetupRequest = function() {
  this.data = {};
}

MeetupRequest.prototype.CORopenEvents = function(position) {
  var meetupRequestTimeout = setTimeout(function(){
      console.log("Failed to get Meetups.");
  }, 8000);

  $.ajax({
      url: "https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=" + position.lng() + "&limited_events=False&photo-host=public&page=20&time=%2C1d&radius=25.0&lat=" + position.lat() + "&desc=False&status=upcoming&sig_id=130469302&sig=6ebd2b264bedf38cb1e1af50ef292c0e2eeda64d",
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        data.results.forEach(function(result){
          var meetup = new Meetup();
          meetup.init(result);
          aboutMy.meetups.push(meetup);
          console.log(Date(meetup.time))
          meetup.render();
        });
        clearTimeout(meetupRequestTimeout);
        aboutMy.meetups.sort(function(a,b){
          return parseFloat(b.yes_rsvp_count) - parseFloat(a.yes_rsvp_count);
        });
        aboutMy.determineMeetupMapBounds();

      },
  });
}

var Meetup = function() {
}

Meetup.prototype.init = function(data) {
  for (var i in data) {
    this[i] = data[i];
  }
  console.log(this);
}

Meetup.prototype.render = function() {
  if (this.venue){
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.venue.lat, this.venue.lon),
      map: map,
      title: this.group.name
    });
  }
}
