/*
loc is a library to ease the random scheduling of foodtrucks. Values are constrained to the seconds within a day. It accepts input in HH:MM and output in seconds from midnight or HH:MM
*/
var loc = function() {
  var that = this;
  this.lat = 0;
  this.lng = 0;

  this.convertToTime = function(seconds) {
    var hour = Math.floor(seconds/3600);
    var minute = Math.floor((seconds/3600 - hour) * 60);
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    return hour + ":" + minute;
  };

};


loc.prototype.getStartTime = function(){
  return this.convertToTime(this.startSeconds);
};

loc.prototype.getEndTime = function (){
  return this.convertToTime(this.endSeconds);
};


loc.prototype.initSecs = function(start, end){
  this.startSeconds = this.verifySeconds(start);
  this.endSeconds = this.verifySeconds(end);
};

loc.prototype.startSecs = function(start){
  this.startSeconds = this.verifySeconds(start);
};

loc.prototype.endSecs = function(end){
  this.endSeconds = this.verifySeconds(end);
};

loc.prototype.getStartSecs = function(){
  return this.startSeconds;
};

loc.prototype.getEndSecs = function (){
  return this.endSeconds;
};
