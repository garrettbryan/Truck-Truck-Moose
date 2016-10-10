

$( window ).resize( function() {
  createViewWithoutScrollbar();
  extendContributorList();
});

function createViewWithoutScrollbar(){
  $('#scrollbar-remover-container')
    .height($(window).height() - $('.global-header').outerHeight(true))
    .width($(window).width());
  $('#main-form')
    .width($(window).width() + 16)
    .css('padding-right', '25px');
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