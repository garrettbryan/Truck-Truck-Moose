/*
generic.js contains a number of functions that are used throughout the app.
*/
function createViewWithoutScrollbar(){
  var height = $('#login-screen').outerHeight(true) > $(window).height() ? $('#login-screen').outerHeight(true) : $(window).height() - $('.global-header').outerHeight(true);

  $('#scrollbar-remover-container')
  .height($(window).height() - $('.global-header').outerHeight(true))
  .width($(window).width());

  $('#spacer')
  .height(height);

  $('#main-form')
  .outerWidth($('#scrollbar-remover-container').width() + ($('#main-form').outerWidth() - $('#main-form')[0].clientWidth));
}


function resize(element){
      $(element)
      .css('margin-top', $('.login').outerHeight(true))
      .css('height', $(window).height() - $('.login').outerHeight(true)-$('.global-header').outerHeight(true));
}


function resizeMainForm(){
  $('#scrollbar-remover-container').height($(window).height() - $('.global-header').outerHeight(true));
}


function removeMainFormSizing(){
  $('#main-form').height('');
}
