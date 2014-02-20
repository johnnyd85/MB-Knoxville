// Import the mongodb library as 'mongo'
var mongo = require('mongodb');

// Define some commonly-used mongo services e.g. server, DB
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

// Start running our mongo server on port 27017
var server = new Server('localhost', 27017, {auto_reconnect: true});

// Start displaying our database 'ridesdb' on our server
db = new Db('ridesdb', server);

// When the database is loaded, run this function
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

// Allow our server app to access the findById function, which returns a
// particular ride from the database based on its ID
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving ride: ' + id);
    db.collection('rides', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

// Allow our server app to access the findAll function, which returns all rides
exports.findAll = function(req, res) {
    db.collection('rides', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send({rides: items});
        });
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var rides = [
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