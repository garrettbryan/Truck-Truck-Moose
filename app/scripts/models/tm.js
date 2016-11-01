/*
tm is a library to ease the random scheduling of foodtrucks. Values are constrained to the seconds within a day. It accepts input in HH:MM and output in seconds from midnight or HH:MM
*/
  var TimeHelper = function() {
    this.seconds = 0;

    this.convertToTime = function(seconds) {
      var hour = Math.floor(seconds/3600);
      var minute = Math.floor((seconds/3600 - hour) * 60);
      hour = hour < 10 ? '0' + hour : hour;
      minute = minute < 10 ? '0' + minute : minute;
      return hour + ':' + minute;
    };

    this.verifySeconds = function(seconds) {
      var value = -1;
      if( seconds >= (24 * 60 * 60)) {
        value = +seconds;
      }
      if ( seconds < 0) {
        value = +seconds;
      }
      if (value !== undefined){
        value = +seconds;
      }
      return value;
    };
  };


  TimeHelper.prototype.getTime = function(){
    return this.convertToTime(this.seconds);
  };

  TimeHelper.prototype.initSecs = function(seconds){
    this.seconds = this.verifySeconds(seconds);
  };

  TimeHelper.prototype.getSecs = function(){
    return this.seconds;
  };
