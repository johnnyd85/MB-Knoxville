App = Ember.Application.create({});

App.Router.map(function() {
    this.resource('rides');
});


App.IndexRoute = Ember.Route.extend({
    model: function(){
        return [
            {firstName: 'John', lastName: 'Dillman'},
            {firstName: 'Nick', lastName: 'Shoemaker'}
        ];
    }
});

App.RidesRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('ride');
    }
});

App.Ride = DS.Model.extend({
    title: DS.attr('string'),
    type: DS.attr('string'),
    length: DS.attr('number'),
});

App.DataTableView =  Ember.View.extend({

    classNames:['table','table-striped','table-bordered','dataTable'],
    tagName:'table',
    didInsertElement: function(){
        var self = this;
        data = self.rides.getEach('data');

        this.$().dataTable({

            "bProcessing": true,
            "aaData": data,

            "aoColumns": [
                { "sTitle" : "Name", "mData": "title" },
                { "sTitle" : "Type", "mData": "type" },
                { "sTitle" : "Length", "mData": "length" }
            ]
        });
    }
});



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