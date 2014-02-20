App = Ember.Application.create({});

// Define the app routes aka URL structure
App.Router.map(function() {
    this.resource('rides');
});

// IndexRoute - home page
App.IndexRoute = Ember.Route.extend({
    model: function(){
        return [
            {firstName: 'John', lastName: 'Dillman'},
            {firstName: 'Nick', lastName: 'Shoemaker'}
        ];
    }
});

// RidesRoute - display a list of rides
App.RidesRoute = Ember.Route.extend({
    model: function() {
        // Query the Mongo data store for all of the ride models
        return this.store.find('ride');
    }
});

// Define the Ride model that represents a ride in the Ember app
App.Ride = DS.Model.extend({
    title: DS.attr('string'),
    type: DS.attr('string'),
    length: DS.attr('number'),
});

// DataTableView - take the rides models and put them into a jQuery data table
App.DataTableView =  Ember.View.extend({

    classNames:['table','table-striped','table-bordered','dataTable'],
    tagName:'table',

    // DidInsertElement is an Ember event that is triggered when the view
    // element has been inserted into the DOM.
    // See: http://emberjs.com/api/classes/Ember.View.html#event_didInsertElement
    didInsertElement: function(){

        // We called the binding ridesBinding in the template, so the array
        // containing our rides is accessable at this.rides.
        // We extract the data from this.rides and put it into a 'data' var
        var data = this.rides.getEach('data');

        // Here we define our data table. The $ is shortcut for jQuery
        this.$().dataTable({

            // Adds a 'processing' indicator when data is being processed
            "bProcessing": true,
            // Pass in our data to the data table. Why is it called aaData?
            // Only jQuery DataTables knows
            "aaData": data,
            // Define the columns for our table
            "aoColumns": [
                { "sTitle" : "Name", "mData": "title" },
                { "sTitle" : "Type", "mData": "type" },
                { "sTitle" : "Length", "mData": "length" }
            ]
        });
    }
});


// Mock ride data for test purposes

// App.Ride.FIXTURES = [
//     {
//      id: 1,
//      title: 'Haw Ridge',
//      type: 'Mountain',
//      length: 25
//   },
//   {
//     id: 2,
//    title: 'Foothills Parkway',
//    type: 'Road',
//    length: 50
//   },
//   {
//     id: 3,
//     title: 'South Knox',
//     type: 'Mountain',
//     length: 30
//   },
//   {
//     id: 4,
//     title: 'Tsali',
//     type: 'Mountain',
//     length: 20
//   },
//   {
//     id:5,
//     title: 'West Knoxville',
//     type: 'Road',
//     length: 15
//   }];