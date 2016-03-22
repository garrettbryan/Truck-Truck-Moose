Meetup.Prototype.init = function(){
  var MeetupRequest = function() {
  this.data = {};
};

MeetupRequest.prototype.CORopenEvents = function(position) {
  var meetupRequestTimeout = setTimeout(function(){
      console.log('Failed to get Meetups.');
  }, 8000);

  $.ajax({
      url: 'https://api.meetup.com/2/open_events?and_text=False&offset=0&format=json&lon=' + position.lng() + '&limited_events=False&photo-host=public&page=20&time=%2C1d&radius=25.0&lat=' + position.lat() + '&desc=False&status=upcoming&sig_id=130469302&sig=6ebd2b264bedf38cb1e1af50ef292c0e2eeda64d',
      dataType: 'jsonp',
      success: function(data) {
        console.log(data);
        /*
        data.results.forEach(function(result){
          var meetup = new Meetup();
          meetup.init(result);
          aboutMy.meetups.push(meetup);
//          console.log(Date(meetup.time))
          meetup.render();
        });
*/
        clearTimeout(meetupRequestTimeout);
        aboutMy.meetups.sort(function(a,b){
          return parseFloat(b.yes_rsvp_count) - parseFloat(a.yes_rsvp_count);
        });
        aboutMy.determineMeetupMapBounds();
      },
      error: function(data) {
        console.log('meetup Error');
        console.log(data);
      }
  });
};
};