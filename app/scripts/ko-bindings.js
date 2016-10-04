/*
http://knockoutjs.com/documentation/custom-bindings.html

The “update” callback

Knockout will call the update callback initially when the binding is applied to an element and track any dependencies (observables/computeds) that you access. When any of these dependencies change, the update callback will be called once again. The following parameters are passed to it:

element — The DOM element involved in this binding
valueAccessor — A JavaScript function that you can call to get the current model property that is involved in this binding. Call this without passing any parameters (i.e., call valueAccessor()) to get the current model property value. To easily accept both observable and plain values, call ko.unwrap on the returned value.
allBindings — A JavaScript object that you can use to access all the model values bound to this DOM element. Call allBindings.get('name') to retrieve the value of the name binding (returns undefined if the binding doesn’t exist); or allBindings.has('name') to determine if the name binding is present for the current element.
viewModel — This parameter is deprecated in Knockout 3.x. Use bindingContext.$data or bindingContext.$rawData to access the view model instead.
bindingContext — An object that holds the binding context available to this element’s bindings. This object includes special properties including $parent, $parents, and $root that can be used to access data that is bound against ancestors of this context.

The “init” callback

Knockout will call your init function once for each DOM element that you use the binding on. There are two main uses for init:

To set any initial state for the DOM element
To register any event handlers so that, for example, when the user clicks on or modifies the DOM element, you can change the state of the associated observable


*/

ko.bindingHandlers.yourBindingName = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.
    }
};

ko.bindingHandlers.displayWeather = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
          var WeatherUnderground = function(){
        this.overlay = {};
        this.mapBounds = {};
        this.divWidth = 0;
        this.divHeight = 0;
      };

      WeatherUnderground.prototype.setDimensions = function(map){
        this.mapBounds  = {
          north: map.getBounds().getNorthEast().lat(),
          south: map.getBounds().getSouthWest().lat(),
          east: map.getBounds().getNorthEast().lng(),
          west: map.getBounds().getSouthWest().lng(),
        };
        /*
        var mapBounds = {
          north: 35.693,
          south: 35.526,
          east: -78.589,
          west: -78.719
        };
        */
        this.divWidth = document.getElementById('map-canvas').clientWidth;
        this.divHeight = document.getElementById('map-canvas').clientHeight;
      };

      WeatherUnderground.prototype.render = function(){
        this.overlay = new google.maps.GroundOverlay('http://api.wunderground.com/api/ec12cd13256c67c5/animatedradar/image.gif?maxlat=' + this.mapBounds.north + '&maxlon=' + this.mapBounds.east + '&minlat=' + this.mapBounds.south + '&minlon=' + this.mapBounds.west + '&width=' +this.divWidth + '&height=' + this.divHeight + '&rainsnow=1&num=5&delay=50&timelabel=1&timelabel.x=525&timelabel.y=41&smooth=1', this.mapBounds);
        this.overlay.setMap(map);
      };
    },

    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

    }

};

ko.bindingHandlers.geoToAddress = {
    init: function(element, valueAccessor, allbindings, data, context) {
        var observable = valueAccessor();
        //console.log(element);
        //valueAccessor(20);
        //console.log(valueAccessor());
        //console.log(allbindings);
        //console.log(data);
        //console.log(context);

        //observable(context.$root.)

        var geocoder = new google.maps.Geocoder();
        //var address = geocodeLatLng(geocoder, context.$root.map,valueAccessor());
            geocoder.geocode({'location': context.$root.user.position()}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                  if (results[1]) {
                    //context.$root.map.setZoom(11);
                    var marker = new google.maps.Marker({
                      position: context.$root.user.position(),
                      map: context.$root.map
                    });
                    console.log(results[1].formatted_address);
                    observable(results[1].formatted_address);
                    //console.log(observable());
                    //ko.bindingHandlers.value.update(element,valueAccessor);
                  } else {
                    window.alert('No results found');
                  }
                } else {
                  window.alert('Geocoder failed due to: ' + status);
                }
            });

        ko.bindingHandlers.textInput.init(element,valueAccessor);

        //console.log(address);

        //ko.bindingHandlers.value.update(element,valueAccessor);
    },
    update: function(element, valueAccessor) {
        //console.log(valueAccessor()());
        //console.log(ko.bindingHandlers.textInput);
    }
};

ko.bindingHandlers.selectTruck = {
    init: function(element, valueAccessor, allBindings, data, context) {

        $(element).click(function(){
        console.log(element);
        //valueAccessor(20);
        console.log(valueAccessor());
        console.log(allbindings);
        console.log(data);
        console.log(context);
        });
/*        //ko.bindingHandlers.text.init(valueAccessor())
        $(element).click(function(){
            context.$root.user.end(valueAccessor());
            console.log(context.$root.user.end());
            $('#end').val(context.$root.user.end());
            context.$root.prunedPossibleDestinations([]);
            console.log(element);
            //valueAccessor(20);
            console.log(valueAccessor());
            //console.log(allbindings);
            console.log(data);
            console.log(context);
            context.$root.user.end(valueAccessor());
            $(element).siblings().removeClass('highlight-destination');
            $(element).addClass('highlight-destination');
            if (data.type === 'google'){
                console.log(data);
            }else if (data.type === 'meetup') {
                this.selectedDestination = data;
                console.log(data);
                google.maps.event.trigger(data.marker, 'click');
            }
        });
*/
    },
    update: function(element, valueAccessor, allBindings, data, context) {
        console.log("selectTruck update");
        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);
        console.log(valueUnwrapped);
        ko.bindingHandlers.text.update(element, valueAccessor);
    }
};

ko.bindingHandlers.truckFilter = {
    init: function(element, valueAccessor, allBindings, data, context){
//prunedPossibleFoodTrucks
//<img id="main-logo" class="img-responsive center-block img-rounded" data-bind="attr : {src: img}" alt="MeeTruck Logo">
//swiper-wrapper
        context.$root.prunedPossibleFoodTrucks(context.$root.foodTrucks());

        var searchFoodTrucks = function(searchString) {
            var re = new RegExp(searchString,'i');
            //console.log(regexp);
            //console.log(context.$root.meetups());
            context.$root.foodTrucks().forEach( function(foodTruck) {
                console.log(foodTruck);
                if(searchFunction(re, foodTruck)) {
                    context.$root.prunedPossibleFoodTrucks.push(foodTruck);
                }
            });
            console.log(context.$root.prunedPossibleFoodTrucks());
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
                        console.log(dish.name());
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
            console.log(element);
            context.$root.prunedPossibleFoodTrucks([]);
            var observable = valueAccessor();
            observable($(element).val());
            searchFoodTrucks($(element).val());
            console.log(observable());
        });

    },
    update: function(element, valueAccessor, allBindings, data, context) {
    }
};

ko.bindingHandlers.meetupsGoogleAutoComplete = {
    init: function(element, valueAccessor, allBindings, data, context){

        console.log(context);
        console.log(data);
        var places, infoWindow;
        var markers = [];
        var countryRestrict = {'country': 'us'};

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
            console.log(context.$root.prunedPossibleDestinations());
        };

        var searchMeetups = function(regexp) {
            var re = new RegExp(regexp,'i');
            console.log(regexp);
            //console.log(context.$root.meetups());
            context.$root.meetups().forEach( function(meetup) {
            //    console.log(meetup);
                if(searchFunction(re, meetup)) {
                    context.$root.prunedPossibleDestinations.push(meetup);
                }
            });
            console.log(context.$root.prunedPossibleDestinations());
        };

        var searchFunction = function(re, meetup){
            var result = false;
            //result = re.test(foodTruck.description) || re.test(foodTruck.name);
            console.log(re);
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
        //console.log(element);
        $(element).keyup( function(){
            //clearTimeout(finishDestination);
            context.$root.prunedPossibleDestinations([]);
            var observable = valueAccessor();
            observable($(element).val());
            /* add google destinations
            autocomplete.getQueryPredictions({
                input: $(element).val(),
                location: context.$root.user.position(),
                radius: '500',
               // type: ['store']
            }, autocompleteCallback);*/
            if($(element).val()){
                searchMeetups($(element).val());
                console.log(observable());
                context.$data.showDropdown(true);
                /*
                if (context.$root.prunedPossibleDestinations().length === 1){
                    var finishDestination = setTimeout( function(){
                        $(element).val(context.$root.prunedPossibleDestinations()[0].group.name);
                    }, 500);
                    context.$data.showDropdown(false);
                }
                */
            } else {
                console.log("no values");
                context.$data.showDropdown(false);
                context.$root.prunedPossibleDestinations(context.$root.meetups());
            }
        });

        $(element).focusout( function(){
            if (context.$root.prunedPossibleDestinations().length <= 1){
                context.$data.showDropdown(false);
            }
        });
        $(element).focusin( function(){
            if (context.$root.prunedPossibleDestinations().length > 1){
                context.$data.showDropdown(true);
            }
        });
    },
    update: function(element, valueAccessor, allBindings, data, context) {
        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);
        console.log(valueUnwrapped);
        ko.bindingHandlers.text.update(element, valueAccessor);
        console.log(context.$root.user.end());
    }
};

ko.bindingHandlers.destinationDropdown = {
    init: function(element, valueAccessor, allBindings, data, context) {
        //console.log(element);
        //valueAccessor(20);
        //console.log(valueAccessor());
        //console.log(allbindings);
        //console.log(data);
        console.log(context);
        //ko.bindingHandlers.text.init(valueAccessor())
        $(element).mouseover(function(){
            console.log($(element).siblings());
            $(element).siblings().removeClass('highlight-destination');
            $(element).addClass('highlight-destination');
            if (data.type === 'google'){
                console.log(data);
            }else if (data.type === 'meetup') {
                //this.selectedDestination = data;
                console.log(data);
                google.maps.event.trigger(data.marker, 'highlight');
            }
        });
        $(element).click(function(){
            console.log(context);
            context.$component.showDropdown(false);
            context.$root.user.end(valueAccessor());
            console.log(context.$root.user.end());
            $('#end').val(context.$root.user.end());
            context.$root.prunedPossibleDestinations([]);
            console.log(element);
            //valueAccessor(20);
            console.log(valueAccessor());
            //console.log(allbindings);
            console.log(data);
            console.log(context);
            context.$root.user.end(valueAccessor());
            $(element).siblings().removeClass('highlight-destination');
            $(element).addClass('highlight-destination');
            if (data.type === 'google'){
                console.log(data);
            }else if (data.type === 'meetup') {
                this.selectedDestination = data;
                console.log(data);
                google.maps.event.trigger(data.marker, 'click');
            }
        });
    },
    update: function(element, valueAccessor, allBindings, data, context) {
        console.log("destinationDropdown update");
        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);
        console.log(valueUnwrapped);
        ko.bindingHandlers.text.update(element, valueAccessor);

        //ko.bindingHandlers.text(value);
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

ko.bindingHandlers.selectTruck = {
    init: function(element, valueAccessor) {
       console.log($(element));
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
                observable(index+1);               // Write the new rating to it
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
        console.log("scrollDown");

//        element.on('heightChange', function(){
//            alert('xxx');
//        });
    },
    update: function(element, valueAccessor, allBindings, data, context) {
        console.log("update scrollDown");

        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);
        console.log(element);
        console.log(valueUnwrapped);
        console.log(context);
 //       element.trigger("heightChange");
         console.log($(element));
         console.log(element.clientHeight);
         console.log(element.scrollHeight);
         // certain browsers have a bug such that scrollHeight is too small
         // when content does not fill the client area of the element
         var scrollHeight = Math.max(element.scrollHeight, element.clientHeight);
         element.scrollTop = scrollHeight - element.clientHeight;
         console.log(element.scrollTop);
    }
};


ko.bindingHandlers.headerSlide = {
    update: function(element, valueAccessor) {

        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);
        console.log(element);
        console.log(valueUnwrapped);

        if (valueUnwrapped){
            $(".global-header").addClass('header-close');
        }
        else{
            $(".global-header").removeClass('header-close');
        }
    }
};

ko.bindingHandlers.descriptorSlide = {
    init: function(element, valueAccessor) {
        console.log(element);
        console.log(valueAccessor);
        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);

    },
    update: function(element, valueAccessor) {

        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);
        console.log(element);
        console.log(valueUnwrapped);

        if (valueUnwrapped === 1){
            $(element).addClass('descriptor-open');
        }
        else if(valueUnwrapped === 2){
            $(element).removeClass('descriptor-open');
            $(element).addClass('descriptor-open-more');
        }
        else{
            $(element).removeClass('descriptor-open-more');
            value(0);
        }
    }
};

ko.bindingHandlers.formSlide = {
    init: function(element, valueAccessor) {
        console.log(element);
        console.log(valueAccessor);
        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);

    },
    update: function(element, valueAccessor) {

        var value = valueAccessor();
        var valueUnwrapped = ko.unwrap(value);
        console.log(element);
        console.log(valueUnwrapped);

        if (!valueUnwrapped){
            $("#main-form").addClass('main-form-close');
        }
        else {
            $("#main-form").removeClass('main-form-close');
        }
    }
};


/*
function Answer(text) { this.answerText = text; this.points = ko.observable(1); }

function SurveyViewModel(question, pointsBudget, answers) {
    this.question = question;
    this.pointsBudget = pointsBudget;
    this.answers = $.map(answers, function(text) { return new Answer(text) });
    this.save = function() { alert('To do') };

    this.pointsUsed = ko.computed(function() {
        var total = 0;
        for (var i = 0; i < this.answers.length; i++)
            total += this.answers[i].points();
        return total;
    }, this);
}

ko.applyBindings(new SurveyViewModel("Which factors affect your technology choices?", 10, [
   "Functionality, compatibility, pricing - all that boring stuff",
   "How often it is mentioned on Hacker News",
   "Number of gradients/dropshadows on project homepage",
   "Totally believable testimonials on project homepage"
]));

HTML
<h3 data-bind="text: question"></h3>
<p>Please distribute <b data-bind="text: pointsBudget"></b> points between the following options.</p>

<table>
    <thead><tr><th>Option</th><th>Importance</th></tr></thead>
    <tbody data-bind="foreach: answers">
        <tr>
            <td data-bind="text: answerText"></td>
            <td data-bind="starRating: points"></td>
        </tr>
    </tbody>
</table>

<h3 data-bind="fadeVisible: pointsUsed() > pointsBudget">You've used too many points! Please remove some.</h3>
<p>You've got <b data-bind="text: pointsBudget - pointsUsed()"></b> points left to use.</p>
<button data-bind="jqButton: { enable: pointsUsed() <= pointsBudget }, click: save">Finished</button>



*/