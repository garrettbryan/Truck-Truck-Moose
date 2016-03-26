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

ko.bindingHandlers.meetupsGoogleAutoComplete = {
    init: function(element, valueAccessor, allBindings, data, context){

        console.log(context);
        console.log(document.getElementById('search'));
        var places, infoWindow;
        var markers = [];
        var autocomplete;
        var countryRestrict = {'country': 'us'};

        this.autocomplete = new google.maps.places.Autocomplete(
          element, {
          types: ['(cities)'],
          componentRestrictions: countryRestrict
        });

        $('element').keyup(function(){
            autocomplete.getPlacePredictions({
                input: valueAccessor(),
                location: $root.user.position,
                radius: '500'
            }, autocompleteCallback);
            console.log(valueAccessor());
        });
    },
    update: function(element, valueAccessor, allBindings) {
        console.log("hey there");
    }
};

function autocompleteCallback(predictions, status) {
  var autocompletePredictions = "";
  if (status != google.maps.places.PlacesServiceStatus.OK) {
    alert(status);
    return;
  }
  console.log(predictions);
  predictions.forEach(function(prediction){
    autocompletePredictions += "<li>" + prediction.description + "</li>";
  });
}


ko.bindingHandlers.slideVisible = {
    update: function(element, valueAccessor, allBindings) {
        // First get the latest data that we're bound to
        var value = valueAccessor();
 
        // Next, whether or not the supplied model property is observable, get its current value
        var valueUnwrapped = ko.unwrap(value);
 
        // Grab some more data from another binding property
        var duration = allBindings.get('slideDuration') || 400; // 400ms is default duration unless otherwise specified
 
        // Now manipulate the DOM element
        if (valueUnwrapped == true)
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