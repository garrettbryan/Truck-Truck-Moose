

$( window ).resize( function() {
  createViewWithoutScrollbar();
  //extendContributorList();
});




function createViewWithoutScrollbar(){
  console.log($('#login-screen').outerHeight(true) + ' > ' + $(window).height());

  var height = $('#login-screen').outerHeight(true) > $(window).height() ? $('#login-screen').outerHeight(true) : $(window).height() - $('.global-header').outerHeight(true);

  console.log(height);

  $('#scrollbar-remover-container')
  .height($(window).height() - $('.global-header').outerHeight(true))
  .width($(window).width());

  $('#spacer')
  .height(height);

  $('#main-form')
  .outerWidth($('#scrollbar-remover-container').width() + ($('#main-form').outerWidth() - $('#main-form')[0].clientWidth));
    //.css('padding-right', '25px');
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

function extendContributorList(){
  console.log($(window).height() - $('#logo').outerHeight(true) - $('.login').outerHeight(true));
  //$('#special-thanks-footer').height($(window).height() - $('#logo').outerHeight(true) - $('.login').outerHeight(true));
}