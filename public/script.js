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
    var rides = this.store.find('ride');
    console.log(rides);
    return rides;
  }
});

App.DataTableView =  Ember.View.extend({
  
  classNames:['table','table-striped','table-bordered','dataTable'],
  tagName:'table',
  didInsertElement: function(){
  var self = this;
  console.log(self);
  
  this.$().dataTable({
 
          "bProcessing": true,
          "aaData":App.Ride,

            "aoColumns": [
            { "sTitle" : "Name", "mData": "title" },
            { "sTitle" : "Type", "mData": "type" },
            { "sTitle" : "Length", "mData": "length" }
            ]

        });
	//});

  }
});

App.Ride = DS.Model.extend({
  title: DS.attr('string'),
  type: DS.attr('string'),
  length: DS.attr('number')
});

/*App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.ApplicationAdapter = DS.RESTAdapter.extend({ 
   url: 'http://localhost:3000',
   namespace: 'rides',
   serializer: DS.RESTSerializer.extend({
        primaryKey: function(type) {
            return '_id';
        }
   })
});

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id',
});

App.Ride.FIXTURES = [
  {
   id: 1,
   title: 'Haw Ridge',
   type: 'Mountain',
   length: 25
  },
  {
    id: 2,
   title: 'Foothills Parkway',
   type: 'Road',
   length: 50
  },
  {
    id: 3,
    title: 'South Knox',
    type: 'Mountain',
    length: 30
  },
  {
    id: 4,
    title: 'Tsali',
    type: 'Mountain',
    length: 20
  },
  {
    id:5,
    title: 'West Knoxville',
    type: 'Road',
    length: 15
  }
  ];*/