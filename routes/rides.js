var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('ridesdb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'ridesdb' database");
        db.collection('rides', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'rides' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving ride: ' + id);
    db.collection('rides', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('rides', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
 
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var rides = 
    [
     {
  	title: 'Haw Ridge',
   	type: 'Mountain',
   	length: 25
     },
     {
   	title: 'Foothills Parkway',
   	type: 'Road',
   	length: 50
     },
     {
    	title: 'South Knox',
    	type: 'Mountain',
    	length: 30
     },
     {
    	title: 'Tsali',
    	type: 'Mountain',
    	length: 20
     },
     {
    	title: 'West Knoxville',
    	type: 'Road',
    	length: 15
     }];
 
    db.collection('rides', function(err, collection) {
        collection.insert(rides, {safe:true}, function(err, result) {});
    });
 
};