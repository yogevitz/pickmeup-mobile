const express = require("express");
const app = express();
app.use(express.json());
var assert = require('assert');
usernames = [ { id: 0, name: "user0" } ];
//-------------connecting to the mongoDB server----------//


const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://idsh:idaNN1991@cluster0-c0w6a.gcp.mongodb.net/test?retryWrites=true&w=majority";
const uri = uri1 = "mongodb://localhost:27017/PickMeUp'";
const client = new MongoClient(uri, { useNewUrlParser: true });

// Connect to the db
MongoClient.connect(uri, function (err, db) {

  //if(err) throw err;

  if(err){
    console.log("did not conected")
  }
  else{
    console.log("conected")
  }

});


//-------------All GET requests---------------//



//------//
app.get("/getRider/:riderId", (req, res) => {
  console.log("Got GET Request");
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Riders').find({FirstName:riderId}).toArray(function(err, docs) {
      // Print the documents returned
      docs.forEach(function(doc) {
        res.status(200).send(doc)
      });

      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });

  riderId = req.params.riderId

  client.close();


});


//------//
app.get("/getShuttle/:shuttleId", (req, res) => {
  console.log("Got GET Request");
  var shuttleId = req.params.shuttleId;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Shuttles').find({Name:shuttleId}).toArray(function(err, docs) {
      // Print the documents returned
      docs.forEach(function(doc) {
        res.status(200).send(doc)
      });

      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });

  riderId = req.params.riderId

  client.close();


});



//------//
app.get("/getSupervisor/:supervisorName", (req, res) => {
  console.log("Got GET Request");
  var supervisorName = req.params.supervisorName;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Supervisors').find({FirstName:supervisorName}).toArray(function(err, docs) {
      // Print the documents returned
      docs.forEach(function(doc) {
        res.status(200).send(doc)
      });

      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });

  riderId = req.params.riderId

  client.close();
});




//------//
app.get("/getAllShuttles", (req, res) => {
  console.log("Got GET Request");
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Shuttles').find({}).toArray(function(err, docs) {
      // Print the documents returned

      res.status(200).send(docs)


      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });

  riderId = req.params.riderId

  client.close();
});



//------//
app.get("/getAllRiders", (req, res) => {
  console.log("Got GET Request");
  uri1 = "mongodb://localhost:27017/PickMeUp'"
  MongoClient.connect(uri1,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Riders').find({}).toArray(function(err, docs) {
      // Print the documents returned
      res.status(200).send(docs)
      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });
  riderId = req.params.riderId

  client.close();

});


//------//
app.get("/getAllShuttleRiders/:shuttleID", (req, res) => {
  console.log("Got GET Request");
  shuttleId1 = req.params.shuttleID
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('ShutteleRiders').find({shuttleId:shuttleId1}).toArray(function(err, docs) {
      // Print the documents returned

      res.status(200).send(docs)


      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });

  riderId = req.params.riderId

  client.close();
});


//------//
app.get("/getPassword/:userId", (req, res) => {
  console.log("Got GET Request");
  userId1 = req.params.userId
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Users').find({userId:userId1}).toArray(function(err, docs) {
      // Print the documents returned

      res.status(200).send(docs)


      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });

  riderId = req.params.riderId


});

//-------------All POST requests--------------//


//------//
app.post("/api/createShuttle", (req, res) => {
  console.log("got new post request")
  usernames = [ { id: 0, name: "user0" } ];
  const Shuttle = {
    ShuttleId: generateShuttleId(),
    Destination: req.body.Destination,
    Name:req.body.Name

  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    try{
      db.collection('Shuttles').insertOne(Shuttle);
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Shuttle Created!")
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});



//------//
app.post("/api/setShuttle", (req, res) => {
  console.log("got new post request")
  const Shuttle = {
    ShuttleId: req.body.ShuttleId,
    Destination: req.body.Destination,
    Name:req.body.Name

  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    console.log(Shuttle.ShuttleId)
    // Find some documents in our collection
    try{
      db.collection('Shuttles').updateOne(
          {"ShuttleId" : Shuttle.ShuttleId},

          { $set:
                {"ShuttleId" : Shuttle.ShuttleId ,Destination : Shuttle.Destination,Name: Shuttle.Name}

          }
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Shuttle Changed!")
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//


app.post("/api/createRider", (req, res) => {
  console.log("got new post request")
  const Rider = {
    riderId: req.body.riderId,
    FirstName: req.body.FirstName,
    LastName:req.body.LastName,
    ParentName : req.body.ParentName,
    ParentEmail : req.body.ParentEmail,
    ParentPhone : req.body.ParentPhone,
    Location : req.body.Location
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    console.log(Rider.riderId)
    // Find some documents in our collection
    try{
      db.collection('Riders').insertOne(Rider);
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Rider Created!")
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/api/setRider", (req, res) => {
  console.log("got new post request")
  const Rider = {
    riderId: req.body.riderId,
    FirstName: req.body.FirstName,
    LastName:req.body.LastName,
    ParentName : req.body.ParentName,
    ParentPhone : req.body.ParentPhone,
    ParentEmail : req.body.ParentEmail,
    Location : req.body.Location

  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');

    // Find some documents in our collection
    try{
      db.collection('Riders').updateOne(
          {"riderId" : Rider.riderId},

          { $set:
            Rider

          }
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Rider Changed!")
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/api/assignRider", (req, res) => {
  console.log("got new post request")
  const RiderOnSuttle = {
    riderId: req.body.riderId,
    ShuttleId: req.body.ShuttleId,
    Time:req.body.Time,
    Date : req.body.Date
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');

    // Find some documents in our collection
    try{
      db.collection('ShuttleRiders').insertOne(RiderOnSuttle);
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Rider assinged to Shuttle!")
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/api/createSupervisor", (req, res) => {
  console.log("got new post request")
  const Supervisor = {
    SupervisorId: req.body.SupervisorId,
    FirstName: req.body.FirstName,
    LastName:req.body.LastName,
    ParentName : req.body.ParentName,
    ParentEmail : req.body.ParentEmail,
    ParentPhone : req.body.ParentPhone,
    Location : req.body.Location
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    try{
      db.collection('Supervisors').insertOne(Supervisor);
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Supervisor Created!")
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/api/setSupervisor", (req, res) => {
  console.log("got new post request")
  const Supervisor = {
    SupervisorId: req.body.SupervisorId,
    FirstName: req.body.FirstName,
    LastName:req.body.LastName,
    ParentName : req.body.ParentName,
    ParentPhone : req.body.ParentPhone,
    ParentEmail : req.body.ParentEmail,
    Location : req.body.Location

  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');

    // Find some documents in our collection
    try{
      db.collection('Supervisors').updateOne(
          {"SupervisorId" : Supervisor.SupervisorId},

          { $set:
            Supervisor

          }
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Supervisor Changed!")
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/api/assignSupervisor", (req, res) => {
  console.log("got new post request")
  const SupervisorOnSuttle = {
    SupervisorId: req.body.SupervisorId,
    ShuttleId: req.body.ShuttleId,
    Time:req.body.Time,
    Date : req.body.Date
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');

    // Find some documents in our collection
    try{
      db.collection('ShuttleSupervisors').insertOne(SupervisorOnSuttle);
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" supervisor assinged to Shuttle!")
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");

});


//------//
app.post("/api/updatePassword", (req, res) => {
  console.log("got new post request")

  const User = {
    userId: req.body.userId,
    password: req.body.password,
    FirstName:req.body.FirstName,
    LastName : req.body.LastName

  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    try{
      db.collection('User').findOne(
          {"userId" : User.userId}
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Find some documents in our collection
    try{
      db.collection('User').updateOne(
          {"userId" : User.userId},

          { $set:
            User

          }
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Rider Changed!")
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");


});



//------//
app.post("/api/setRiderShuttles", (req, res) => {



});


//------//
app.post("/api/setRiderDefultes", (req, res) => {



});


//------//
app.post("/api/assignSupervisor", (req, res) => {



});
//---------HELP FUNCTIONS-------------//

function generateShuttleId(){
  length = 10;
  toReturn = "6";
  for( var i = 0 ; i < length ; i++){
    var temp = Math.floor(Math.random() * 10);
    temp = Number(temp);
    while(temp==0){
      temp = Math.floor(Math.random() * 10);
      temp = Number(temp);
    }
    toReturn = toReturn +temp.toString();
  }
  return toReturn;
}
const port = process.env.PORT || 5000; //environment variable
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});