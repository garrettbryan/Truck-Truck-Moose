ko.bindingHandlers.closeModal = {
  init: function(element, valueAccessor, allBindings, viewModel, context) {
    $(element).click(function(){
      context.$root.warningMessages.shift();
      if (context.$root.warningMessages().length === 0){
        $('#myModal').modal('hide');
        $("#myModal").on("hidden.bs.modal", function () {
          context.$root.warning(false);
        });
      }
    });
  },
  update: function(element, valueAccessor, allBindings, viewModel, context) {
  }
};

/*
Disable element until app is ready to advance.
*/
ko.bindingHandlers.disableUntilReady = {
  init: function(element, valueAccessor, allbindings, data, context) {
    var readyForNextScreen = valueAccessor;
    if (readyForNextScreen()) {
      $(element).attr('disabled', false);
    } else {
      $(element).attr('disabled', true);
    }
  },
  update: function(element, valueAccessor, allBindings, data, context) {
    var readyForNextScreen = valueAccessor;
    if (readyForNextScreen()) {
      $(element).attr('disabled', false);
    } else {
      $(element).attr('disabled', true);
    }
  }
};


ko.bindingHandlers.geoToAddress = {
  init: function(element, valueAccessor, allbindings, data, context) {
    var observable = valueAccessor();
    var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'location': context.$root.user.position()}, function(results, status) {
        if (status === 'OK') {
          if (results[1]) {
            var marker = new google.maps.Marker({
              position: context.$root.user.position(),
              map: context.$root.map
            });
            observable(results[1].formatted_address);

          } else {
            context.$root.warningMessages.unshift('Google did not return a geocoder result');
            context.$root.warning(true);
          }
        } else {
         context.$root.warningMessages.unshift('Unable to access Google\'s Geocoder Service\n' + status);
         context.$root.warning(true);
        }
      });
    ko.bindingHandlers.textInput.init(element,valueAccessor);
  },
  update: function(element, valueAccessor) {
  }
};

/*
truckFilter does a search in truck name, description, and menu options
*/
ko.bindingHandlers.truckFilter = {
  init: function(element, valueAccessor, allBindings, data, context){
    context.$root.prunedPossibleFoodTrucks(context.$root.foodTrucks());
    var searchFoodTrucks = function(searchString) {
      var re = new RegExp(searchString,'i');
      context.$root.foodTrucks().forEach( function(foodTruck) {
        if(searchFunction(re, foodTruck)) {
          context.$root.prunedPossibleFoodTrucks.push(foodTruck);
        }
      });
    };
    var searchFunction = function(re, foodTruck){
      var result = false;
      //result = re.test(foodTruck.description) || re.test(foodTruck.name);
      if (re.test(foodTruck.name)){
        result = true;
      }
      else if (re.test(foodTruck.description)){
        result = true;
      }
      else {
        foodTruck.dailyMenu.forEach(function(dish){
          if (re.test(dish.name())){
            result = true;
          }
          else {
            dish.ingredients().forEach(function(ingredient){
              if (re.test(ingredient)){
                result = true;
              }
            });
          }
        });
      }
      return result;
    };
    $(element).keyup( function(){
      context.$root.prunedPossibleFoodTrucks([]);
      var observable = valueAccessor();
      observable($(element).val());
      searchFoodTrucks($(element).val());
    });
  },
    update: function(element, valueAccessor, allBindings, data, context) {
    }
};

/*
searches meetups for keystrings. Also need to update so that Google will supply suggested destinations
*/
ko.bindingHandlers.meetupsGoogleAutoComplete = {
  init: function(element, valueAccessor, allBindings, data, context){
    var places, infoWindow;
    var markers = [];
    var countryRestrict = {'country': 'us'};
    var pressedKeys;
    var lastArray;

    context.$root.prunedPossibleDestinations(context.$root.meetups());

    var autocompleteCallback = function(predictions, status){
      var autocompletePredictions = "";
      alert(status);
      if (status === google.maps.places.AutocompleteService.OK) {
        alert(status);
        return;
      }
      predictions.forEach(function(pred){
        var modpred = pred;
        modpred.group = {
          name: pred.description,
          type: "prediction"
        };
        context.$root.prunedPossibleDestinations.push(modpred);
      });
    };

    var searchMeetups = function(regexp) {
      var re = new RegExp(regexp,'i');
      context.$root.meetups().forEach( function(meetup) {
        if(searchFunction(re, meetup)) {
          context.$root.prunedPossibleDestinations.push(meetup);
        }
      });
    };

    var searchFunction = function(re, meetup){
      var result = false;
      if (re.test(meetup.description)){
        result = true;
      } else if (re.test(meetup.group.name)){
        result = true;
      } else if (re.test(meetup.name)){
        result = true;
      }
      return result;
    };

    var autocomplete = new google.maps.places.AutocompleteService();


    $(element).keyup( function(){
      pressedKeys = $(element).val();
      context.$root.prunedPossibleDestinations([]);
      var observable = valueAccessor();
      observable($(element).val());

      /* TODO add google destinations
      autocomplete.getQueryPredictions({
        input: $(element).val(),
        location: context.$root.user.position(),
        radius: '500',
         // type: ['store']
      }, autocompleteCallback);*/

      if($(element).val().length > 0){
        searchMeetups(pressedKeys);
        if (context.$root.prunedPossibleDestinations().length > 1){
          context.$data.showDropdown(true);
        }
        else {
          context.$data.showDropdown(true);
        }

      } else {
        searchMeetups('.');
        context.$data.showDropdown(true);
        context.$root.prunedPossibleDestinations(context.$root.meetups());
      }
    });

    $(element).focusout( function(){
      if (!($('.destination').is('.highlight-destination'))){
        context.$data.showDropdown(false);
      }
    });

    $(element).focusin( function(){
      $(element).val(pressedKeys);
      context.$root.prunedPossibleDestinations([]);
      searchMeetups(pressedKeys);
      element.setSelectionRange(0, $(element).val().length);
      context.$data.showDropdown(true);
    });

  },
  update: function(element, valueAccessor, allBindings, data, context) {
    var value = valueAccessor();
    var valueUnwrapped = ko.unwrap(value);
    ko.bindingHandlers.text.update(element, valueAccessor);
  }
};

/*
destinationDropdown controls the firing of events so that the drop down affects elements on the map.
*/
ko.bindingHandlers.destinationDropdown = {
  init: function(element, valueAccessor, allBindings, data, context) {
    $(element).mouseover(function(){
      $(element).siblings().removeClass('highlight-destination');
      $(element).addClass('highlight-destination');
      if (data.type === 'google'){
      }else if (data.type === 'meetup') {
        //this.selectedDestination = data;
        google.maps.event.trigger(data.marker, 'highlight');
      }
    });

    $(element).mouseout(function(){
      //$(element).siblings().removeClass('highlight-destination');
      $(element).removeClass('highlight-destination');
    });

    $(element).click(function(){
      context.$root.user.end(valueAccessor());
      $('#end').val(context.$root.user.end());

      context.$root.user.end(valueAccessor());
      $(element).siblings().removeClass('highlight-destination');
      $(element).addClass('highlight-destination');
      if (data.type === 'google'){
      }else if (data.type === 'meetup') {
        this.selectedDestination = data;
        google.maps.event.trigger(data.marker, 'click');
      }
      context.$component.showDropdown(false);
    });

  },
  update: function(element, valueAccessor, allBindings, data, context) {
    var value = valueAccessor();
    var valueUnwrapped = ko.unwrap(value);
    ko.bindingHandlers.text.update(element, valueAccessor);
  }
};

ko.bindingHandlers.openMainFormIfClosed = {
  init: function(element, valueAccessor, allBindings, data, context) {
    $(element).click( function(){
      if ($("#main-form").hasClass('main-form-close')){
        $("#main-form").removeClass('main-form-close');
      }
    });
  },
  update: function(element, valueAccessor, allBindings, data, context) {
  }
};

ko.bindingHandlers.toggleMap = {
  init: function(element, valueAccessor, allBindings, data, context) {
    $(element).click( function(){
      if ($("#main-form").hasClass('main-form-close')){
        $("#main-form").removeClass('main-form-close');
      }
      else {
        $("#main-form").addClass('main-form-close');
      }
    });
  },
  update: function(element, valueAccessor, allBindings, data, context) {
  }
};


ko.bindingHandlers.initializeScreen = {
  init: function(element, valueAccessor, allBindings, data, context) {
    if($('#main-form.half').hasClass('half')){
      $('#main-form.half').removeClass('half');
    }
    if($('#spacer.half').hasClass('half')){
      $('#spacer.half').removeClass('half');
    }
    createViewWithoutScrollbar();
    $( window ).resize( function() {
    createViewWithoutScrollbar();
    });
  },
  update: function(element, valueAccessor, allBindings, data, context) {
  }
};


ko.bindingHandlers.mapScreen = {
  init: function(element, valueAccessor, allBindings, data, context) {
    $('#main-form').addClass('half');
    $('#spacer').addClass('half');
  },
  update: function(element, valueAccessor, allBindings, data, context) {
  }
};


ko.bindingHandlers.textScreen = {
  init: function(element, valueAccessor, allBindings, data, context) {
    if($('#main-form.half').hasClass('half')){
      $('#main-form.half').removeClass('half');
    }
    if($('#spacer.half').hasClass('half')){
      $('#spacer.half').removeClass('half');
    }
  },
  update: function(element, valueAccessor, allBindings, data, context) {
  }
};


ko.bindingHandlers.resize = {
  init: function(element, valueAccessor, allBindings, data, context) {
    $( window ).resize( function() {
      resize(element);
    });
    resize(element);
  },
  update: function(element, valueAccessor, allBindings, data, context) {
  }
};



ko.bindingHandlers.slideVisible = {
  update: function(element, valueAccessor, allBindings) {
    // First get the latest data that we're bound to
    var value = valueAccessor();
    // Next, whether or not the supplied model property is observable, get its current value
    var valueUnwrapped = ko.unwrap(value);
    // Grab some more data from another binding property
    var duration = allBindings.get('slideDuration') || 400; // 400ms is default duration unless otherwise specified
    // Now manipulate the DOM element
    if (valueUnwrapped === true)
      $(element).slideDown(duration); // Make the element visible
    else
      $(element).slideUp(duration);   // Make the element invisible
  }
};


ko.bindingHandlers.starRating = {
  init: function(element, valueAccessor) {
    $(element).addClass("starRating");
    for (var i = 0; i < 5; i++)
       $("<span>").appendTo(element);
    $("span", element).each(function(index) {
      $(this).hover(
        function() {
          $(this).prevAll().add(this).addClass("hoverChosen");
        },
        function() {
          $(this).prevAll().add(this).removeClass("hoverChosen");
        }
      ).click(function() {
        var observable = valueAccessor();  // Get the associated observable
        observable(index+1);         // Write the new rating to it
      });
    });
  },
  update: function(element, valueAccessor) {
    // Give the first x stars the "chosen" class, where x <= rating
    var observable = valueAccessor();
    $("span", element).each(function(index) {
      $(this).toggleClass("chosen", index < observable());
    });
  }
};


ko.bindingHandlers.jqButton = {
  init: function(element) {
     $(element).button(); // Turns the element into a jQuery UI button
  },
  update: function(element, valueAccessor) {
    var currentValue = valueAccessor();
    // Here we just update the "disabled" state, but you could update other properties too
    $(element).button("option", "disabled", currentValue.enable === false);
  }
};


ko.bindingHandlers.fadeVisible = {
  init: function(element, valueAccessor) {
    // Start visible/invisible according to initial value
    var shouldDisplay = valueAccessor();
    $(element).toggle(shouldDisplay);
  },
  update: function(element, valueAccessor) {
    // On update, fade in/out
    var shouldDisplay = valueAccessor();
    //shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
  }
};


ko.bindingHandlers.scrollDown = {
  init: function(element, valueAccessor) {
    var value = valueAccessor();
    var valueUnwrapped = ko.unwrap(value);

  },
  update: function(element, valueAccessor, allBindings, data, context) {

    var value = valueAccessor();
    var valueUnwrapped = ko.unwrap(value);
 //     element.trigger("heightChange");
     // certain browsers have a bug such that scrollHeight is too small
     // when content does not fill the client area of the element
     var scrollHeight = Math.max(element.scrollHeight, element.clientHeight);
     element.scrollTop = scrollHeight - element.clientHeight;
  }
};


ko.bindingHandlers.descriptorSlide = {
  init: function(element, valueAccessor) {
    var value = valueAccessor();
    var valueUnwrapped = ko.unwrap(value);

  },
  update: function(element, valueAccessor) {

    var value = valueAccessor();
    var valueUnwrapped = ko.unwrap(value);

    if (valueUnwrapped === 1){
      $('#drawer-pull').removeClass();
      $('#drawer-pull').addClass('fa fa-chevron-circle-up fa-2x');
      $(element).addClass('descriptor-open');
    }
    else if(valueUnwrapped === 2){
      $('#drawer-pull').removeClass();
      $('#drawer-pull').addClass('fa fa-chevron-circle-down fa-2x');
      $(element).removeClass('descriptor-open');
      $(element).addClass('descriptor-open-more');
    }
    else{
      $('#drawer-pull').removeClass();
      $('#drawer-pull').addClass('fa fa-chevron-circle-up fa-2x');
      $(element).removeClass('descriptor-open-more');
      value(0);
    }
  }
};


