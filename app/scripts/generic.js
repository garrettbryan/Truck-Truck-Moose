

$( window ).resize( function() {
  createViewWithoutScrollbar();
  //extendContributorList();
});

function createViewWithoutScrollbar(){
  $('#scrollbar-remover-container')
    .height($(window).height() - $('.global-header').outerHeight(true))
    .width($(window).width());
  console.log($('#main-form').innerWidth());
  console.log($('#main-form').width());
  console.log($('#main-form').outerWidth(true));
  console.log($('#main-form')[0].clientWidth);
  console.log($('#main-form')[0]);
    $('#main-form').outerWidth($('#scrollbar-remover-container').width() + ($('#main-form').outerWidth() - $('#main-form')[0].clientWidth));
    //.css('padding-right', '25px');
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
