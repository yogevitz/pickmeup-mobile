const express = require("express");
const app = express();
app.use(express.json());
let assert = require('assert');
usernames = [ { id: 0, name: "user0" } ];
//-------------connecting to the mongoDB server----------//


const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://idsh:idaNN1991@cluster0-c0w6a.gcp.mongodb.net/test?retryWrites=true&w=majority";
const uri = uri1 = "mongodb://localhost:27017/PickMeUp'";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
app.get("/getRider/:sid", (req, res) => {
  console.log("Got GET Request");
  sid = req.params.sid;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Riders').find({sid:sid}).toArray(function(err, docs) {
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



  client.close();


});


//------//
app.get("/getShuttle/:shuttleID", (req, res) => {
  console.log("Got GET Request");
  console.log(req.params.shuttleID);
  let shuttleID = req.params.shuttleID;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Shuttles').find({shuttleID:shuttleID}).toArray(function(err, docs) {
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
  client.close();
});



//------//
app.get("/getAllSupervisors", (req, res) => {
  console.log("Got GET Request");
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Supervisors').find({}).toArray(function(err, docs) {
      // Print the documents returned

      res.status(200).send(docs);


      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });
  client.close();
});



//------//
app.get("/getSupervisor/:SupervisorID", (req, res) => {
  console.log("Got GET Request");
  let SupervisorID = req.params.SupervisorID;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Supervisors').find({SupervisorID:SupervisorID}).toArray(function(err, docs) {
      // Print the documents returned
      console.log(docs.length);
      docs.forEach(function(docs) {
        res.status(200).send(docs)
      });

      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });

  riderId = req.params.riderId;

  client.close();
});




//------//
app.get("/getAllShuttles", (req, res) => {
  console.log("Got GET Request");
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Shuttles').find({}).toArray(function(err, docs) {
      // Print the documents returned

      res.status(200).send(docs);


      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });

  riderId = req.params.riderId;

  client.close();
});



//------//
app.get("/getAllRiders", (req, res) => {
  console.log("Got GET Request");
  uri1 = "mongodb://localhost:27017/PickMeUp'";
  MongoClient.connect(uri1,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Riders').find({}).toArray(function(err, docs) {
      // Print the documents returned
      res.status(200).send(docs);
      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });
  riderId = req.params.riderId;

  client.close();

});


//------//
app.get("/getAllShuttleRiders/:shuttleID", (req, res) => {
  console.log("Got GET Request");
  shuttleID = req.params.shuttleID;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('ShuttleRiders').find({shuttleID:shuttleID}).toArray(function(err, docs) {
      // Print the documents returned
      console.log("found "+ docs.length + " riders in the shuttle");
      res.status(200).send(docs);


      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });
  client.close();
});


//------//
app.get("/getPassword/:userID", (req, res) => {
  console.log("Got GET Request");
  userId1 = req.params.userID;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Users').find({userID:userId1}).toArray(function(err, docs) {
      // Print the documents returned

      res.status(200).send(docs[0].password);


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
  console.log("got new post request");
  const Shuttle = {
    shuttleID: generateID(10),
    destination: req.body.destination,
    contactName: req.body.contactName,
    contactPhone: req.body.contactPhone,
    name: req.body.name
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    try {
      db.collection('Shuttles').insertOne(Shuttle);
    } catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Shuttle Created!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});



//------//
app.post("/api/setShuttle", (req, res) => {
  console.log("got new post request");
  const shuttle = {
    shuttleID: req.body.shuttleID,
    destination: req.body.destination,
    contactName: req.body.contactName,
    contactPhone: req.body.contactPhone,
    name:req.body.name

  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    console.log(shuttle.shuttleID);
    // Find some documents in our collection
    try{
      db.collection('Shuttles').updateOne(
        {"shuttleID" : shuttle.shuttleID},

        { $set:
          shuttle
        }
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Shuttle Changed!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//


app.post("/api/createRider", (req, res) => {
  console.log("got new post request");
  const Rider = {
    riderID: generateID(12),
    name: req.body.name,
    sid: req.body.sid,
    parentName: req.body.parentName,
    parentEmail: req.body.parentEmail,
    parentPhone: req.body.parentPhone
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    try{
      db.collection('Riders').insertOne(Rider);
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Rider Created!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/api/setRider", (req, res) => {
  console.log("got new post request");
  const Rider = {
    sid: req.body.sid,
    name: req.body.name,
    parentName : req.body.parentName,
    parentPhone : req.body.parentPhone,
    parentEmail : req.body.parentEmail
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');

    // Find some documents in our collection
    try{
      db.collection('Riders').updateOne(
        {"sid" : Rider.sid},

        { $set:
          Rider

        }
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Rider Changed!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/api/assignRider", (req, res) => {
  console.log("got new post request");
  const riderShuttle = {
    riderID : req.body.riderID,
    shuttleID: req.body.shuttleID,
    date: req.body.date,
    direction : req.body.direction,
    // flag: req.body.flag,
  };
  console.log(req.body.shuttleID + " idan");
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');

    // Find some documents in our collection
    try{
      db.collection('ShuttleRiders').insertOne(riderShuttle);
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Rider assinged to Shuttle!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/api/createSupervisor", (req, res) => {
  console.log("got new post request");
  let sid1 = parseInt(req.body.sid);
  const Supervisor = {
    supervisorID: generateID(13),
    name: req.body.name,
    sid: sid1,
    phone: req.body.phone,
    email : req.body.email
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    try{
      db.collection('Supervisors').insertOne(Supervisor);
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Supervisor Created!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/api/setSupervisor", (req, res) => {
  console.log("got new post request");
  const Supervisor = {
    supervisorID: req.body.supervisorID,
    name: req.body.name,
    sid:req.body.sid,
    phone : req.body.phone,
    email : req.body.email
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');

    // Find some documents in our collection
    console.log(Supervisor.supervisorID);
    try{
      db.collection('Supervisors').updateOne(
        {"supervisorID" : Supervisor.supervisorID},

        { $set:
          Supervisor
        }
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Supervisor Changed!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/api/assignSupervisor", (req, res) => {
  console.log("got new post request");
  const SupervisorOnSuttle = {
    supervisorID: req.body.supervisorID,
    shuttleID: req.body.shuttleID,
    direction:req.body.direction,
    date : req.body.date
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');

    // Find some documents in our collection
    try{
      db.collection('ShuttleSupervisors').insertOne(SupervisorOnSuttle);
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" supervisor assinged to Shuttle!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");

});


//------//
app.post("/api/updatePassword", (req, res) => {
  console.log("got new post request");

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
    let db = client.db('PickMeUp');
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
    res.status(200).send(" Rider Changed!");
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

function generateID(length) {
  let toReturn = "6";
  for (let i = 0; i < length; i++) {
    let temp = Math.floor(Math.random() * 10);
    temp = Number(temp);
    while (temp === 0) {
      temp = Math.floor(Math.random() * 10);
      temp = Number(temp);
    }
    toReturn = toReturn + temp.toString();
  }
  return toReturn;
}

const port = process.env.PORT || 5000; //environment variable
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});