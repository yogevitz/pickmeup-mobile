const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
let assert = require('assert');
usernames = [ { id: 0, name: "user0" } ];
secret = "PickMeUp";





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
  riderID = req.params.riderID;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Riders').find({sid:sid}).toArray(function(err, docs) {
      // Print the documents returned
      if (docs.length === 0)
        res.status(200).send([])
      else{
        docs.forEach(function (doc) {
          res.status(200).send(doc)
        });
      }
      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });
  client.close();
});


//------//
app.get("/getUser/:userID", (req, res) => {
  console.log("Got GET Request");
  userID = req.params.userID;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection

    db.collection('Users').find({userID:userID}).toArray(function(err, docs) {
      // Print the documents returned
      if(docs.length===0)
        res.status(200).send([])
      else
      {
        docs.forEach(function (doc) {
          res.status(200).send(doc)
        });
      }
      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });
  client.close();
});




//------//
app.get("/getAllUsers", (req, res) => {
  console.log("Got GET Request");
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('Users').find({}).toArray(function(err, docs) {
      // Print the documents returned
      if(docs.length===0)
        res.status(200).send([])
      else
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
app.get("/getLiftRiders/:shuttleID/:date/:direction", (req, res) => {
  console.log("Got GET Request");
  const shuttleID = req.params.shuttleID;
  const date = req.params.date;
  const direction = req.params.direction;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server ");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('LiftRiders').find({ shuttleID, date ,direction }).toArray(function(err, docs) {
      // Print the documents returned
      console.log(docs.length);
      if (docs.length === 0)
        res.status(200).send([]);
      else {
        res.status(200).send(docs);
      }
      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });
  client.close();
});

//------//
app.get("/getLiftSupervisor", (req, res) => {
  console.log("Got GET Request");
  var shuttleID = req.body.shuttleID;
  var date = req.body.date;
  var direction = req.body.direction;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('LiftSupervisor').find({shuttleID:shuttleID,date:date,direction:direction}).toArray(function(err, docs) {
      // Print the documents returned
      if(docs.length===0)
        res.status(200).send([])
      else
        res.status(200).send(docs)
      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });
  client.close();
});



//------//
app.get("/getShuttleRiders", (req, res) => {
  console.log("Got GET Request");
  var shuttleID = req.body.shuttleID;
  var date = req.body.date;
  var direction = req.body.direction;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('ShuttleRiders').find({shuttleID:shuttleID,date:date,direction:direction}).toArray(function(err, docs) {
      // Print the documents returned
      if(docs.length===0)
        res.status(200).send([])
      else
        res.status(200).send(docs)
      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });
  client.close();
});

//------//
app.get("/getShuttleRiderByRider", (req, res) => {
  console.log("Got GET Request");
  var riderID = req.body.riderID;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('ShuttlesRiders').find({riderID:riderID}).toArray(function(err, docs) {
      // Print the documents returned
      if(docs.length===0)
        res.status(200).send([])
      else
        res.status(200).send(docs)
      // Close the DB
      client.close();
    });
    // Declare success
    console.log("Called find()");
  });
  client.close();
});


//------//
app.get("/getShuttleRiderByShuttle", (req, res) => {
  console.log("Got GET Request");
  var shuttleID = req.body.shuttleID;
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    db.collection('ShuttlesRiders').find({shuttleID:shuttleID}).toArray(function(err, docs) {
      // Print the documents returned
      if(docs.length===0)
        res.status(200).send([])
      else
        res.status(200).send(docs)
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
      if(docs.length===0)
        res.status(200).send([])
      else {
        docs.forEach(function (doc) {
          res.status(200).send(doc)
        });
      }
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
      if(docs.length===0)
        res.status(200).send([])
      else
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
      if(docs.length===0)
        res.status(200).send([])
      else {
        docs.forEach(function (docs) {
          res.status(200).send(docs)
        });
      }
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
      if(docs.length===0)
        res.status(200).send([])
      else
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
      if(docs.length===0)
        res.status(200).send([])
      else
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
      if(docs.length===0) {
        res.status(200).send([])
        console.log("found " + docs.length + " riders in the shuttle");
      }
      else
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
      if(docs.length===0)
        res.status(200).send([])
      else
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

app.post("/login", (req, res) => {
  payload = { id: generateSupervisorId(), name: req.body.name, admin: true };
  options = { expiresIn: "1d" };
  const token = jwt.sign(payload, secret, options);
  res.send(token);
});
//-------------C R E A T E----------------------//
//------//
app.post("/createSupervisor", (req, res) => {
  console.log("got new post request");
  let sid1 = parseInt(req.body.sid);
  const Supervisor = {
    supervisorID: req.body.supervisorID,
    name: req.body.name,
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
app.post("/createLiftRider", (req, res) => {
  console.log("got new post request");

  const LiftRider = {
    shuttleID: req.body.shuttleID,
    date: req.body.date,
    direction: req.body.direction,
    riderID: req.body.riderID,
    mark:"0",
    approved:"0"
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    try{
      db.collection('LiftRiders').insertOne(LiftRider);
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
app.post("/createLiftSupervisor", (req, res) => {
  console.log("got new post request");

  const LiftRiderSupervisor = {
    shuttleID: req.body.shuttleID,
    supervisorID: req.body.supervisorID,
    date:req.body.date,
    direction:req.body.direction
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    try{
      db.collection('LiftSupervisor').insertOne(LiftRiderSupervisor);
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" LiftSupervisor Created!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/createShuttleRider", (req, res) => {
  console.log("got new post request");
  const Shuttle = {
    shuttleID: req.body.shuttleID,
    riderID: req.body.riderID,
    shuttleName: req.body.shuttleName,
    riderName: req.body.riderName
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    try {
      db.collection('ShuttlesRiders').insertOne(Shuttle);
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
app.post("/createShuttle", (req, res) => {
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
app.post("/createRider", (req, res) => {
  console.log("got new post request");
  const Rider = {
    riderID:  req.body.riderID,
    name: req.body.name,
    parentName: req.body.parentName,
    parentEmail: req.body.parentEmail,
    class:req.body.class,
    teacher:req.body.teacher,
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
app.post("/createUser", (req, res) => {
  console.log("got new post request");
  const User = {
    userID:  req.body.userID,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    question:req.body.question,
    type:req.body.type,
    answer:req.body.answer
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    try{
      db.collection('Users').insertOne(User);
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" User Created!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});



//----------------A S S I G N---------------//
//------//
app.post("/assignRider", (req, res) => {
  console.log("got new post request");
  const riderShuttle = {
    riderID : req.body.riderID,
    shuttleID: req.body.shuttleID,
    date: req.body.date,
    direction : req.body.direction,
    mark:""

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
app.post("/assignSupervisor", (req, res) => {
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

//--------------U P D A T E--------------------//
app.post("/markRider", (req, res) => {
  console.log("got new post request");
  const riderShuttle = {
    riderID : req.body.riderID,
    shuttleID: req.body.shuttleID,
    date: req.body.date,
    direction : req.body.direction,
    mark: req.body.mark
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');

    // Find some documents in our collection
    try{
      db.collection('ShuttleRiders').updateOne(
        {"riderID" : riderShuttle.riderID,
          "shuttleID": riderShuttle.shuttleID,
          "date":riderShuttle.date,
          "direction":riderShuttle.direction},
        { $set:
          riderShuttle
        }
      );
    }catch(e){
      res.status(400).send(e)
    }
    res.status(200).send(" Rider marked to Shuttle!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});

//------//
app.post("/updatePassword", (req, res) => {
  console.log("got new post request");

  const User = {
    userID: req.body.userID,
    password: req.body.password
  };
  console.log(User.userID)
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    try{
      db.collection('Users').findOne(
        {"userID" : User.userID}
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Find some documents in our collection
    try{
      db.collection('Users').updateOne(
        {"userID" : User.userID},

        { $set:
            {"password": User.password}
        }
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Password Changed!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");


});

//-----------------S E T E R S---------------------//
//------//
app.post("/setRider", (req, res) => {
  console.log("got new post request");
  const Rider = {
    riderID: req.body.riderID,
    name: req.body.name,
    parentName : req.body.parentName,
    parentPhone : req.body.parentPhone,
    class: req.body.class,
    teacher: req.body.teacher,
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
app.post("/setUser", (req, res) => {
  console.log("got new post request");
  const User = {
    userID: req.body.userID,
    password: req.body.password,
    type : req.body.type,
    firstName : req.body.firstName,
    lastName: req.body.lastName,
    question: req.body.question,
    answer : req.body.answer
  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');

    // Find some documents in our collection
    try{
      db.collection('Users').updateOne(
        {"userID" : User.userID},

        { $set:
          User
        }
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" User Changed!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/setShuttle", (req, res) => {
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
app.post("/setLiftRiderMark", (req, res) => {
  console.log("got new post request");
  const shuttle = {
    shuttleID: req.body.shuttleID,
    riderID: req.body.riderID,
    date: req.body.date,
    direction: req.body.direction,
    mark:req.body.mark,
    approved:"0"

  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    console.log(shuttle.shuttleID);
    // Find some documents in our collection
    try{
      db.collection('LiftRiders').updateOne(
        {"shuttleID" : shuttle.shuttleID,"riderID":shuttle.riderID,"date":shuttle.date,"direction":shuttle.direction},

        { $set:
          shuttle
        }
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Lift Changed!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/setLiftRiderApproved", (req, res) => {
  console.log("got new post request");
  const shuttle = {
    shuttleID: req.body.shuttleID,
    riderID: req.body.riderID,
    date: req.body.date,
    direction: req.body.direction,
    approved:req.body.approved,
    mark:"0"

  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    console.log(shuttle.shuttleID);
    // Find some documents in our collection
    try{
      db.collection('LiftRiders').updateOne(
        {"shuttleID" : shuttle.shuttleID,"riderID":shuttle.riderID,"date":shuttle.date,"direction":shuttle.direction},

        { $set:
          shuttle
        }
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" Lift Changed!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});




//------//
app.post("/setShuttleRider", (req, res) => {
  console.log("got new post request");
  const shuttleRider = {
    shuttleID: req.body.shuttleID,
    riderID: req.body.riderID,
    shuttleName: req.body.shuttleName,
    riderName: req.body.riderName

  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    console.log(shuttle.shuttleID);
    // Find some documents in our collection
    try{
      db.collection('shuttlesRiders').updateOne(
        {"shuttleID" : shuttle.shuttleID},

        { $set:
          shuttleRider
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
app.post("/setLiftSupervisor", (req, res) => {
  console.log("got new post request");
  const shuttleRider = {
    shuttleID: req.body.shuttleID,
    supervisorID: req.body.supervisorID,
    date: req.body.date,
    direction: req.body.direction

  };
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, client)
  {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    let db = client.db('PickMeUp');
    // Find some documents in our collection
    try{
      db.collection('LiftSupervisor').updateOne(
        {"shuttleID" : shuttleRider.shuttleID,"date":shuttleRider.date,"direction":shuttleRider.direction},

        { $set:
          shuttleRider
        }
      );
    }catch(e){
      res.status(400).send(e)
    }
    // Print the documents returned
    res.status(200).send(" LiftSupervisor Changed!");
    // Close the DB
    client.close();
  });
  // Declare success
  console.log("Called find()");
});



//------//
app.post("/setSupervisor", (req, res) => {
  console.log("got new post request");
  const Supervisor = {
    supervisorID: req.body.supervisorID,
    name: req.body.name,
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
app.post("/setRiderDefultes", (req, res) => {
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
    var db = client.db('PickMeUp');

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
app.post("/setRiderShuttles", (req, res) => {
  console.log("got new post request");
  console.log(req.body.length)
  for(var i = 0 ; i < req.body.length ; i ++ ) {
    const Rider = {
      riderID: req.body[i].riderID,
      shuttleID: req.body[i].shuttleID,
      destination: req.body[i].destination,
      time: req.body[i].time,
      date: req.body[i].date
    };
    MongoClient.connect(uri, {useNewUrlParser: true}, function (err, client) {
      assert.equal(null, err);
      console.log("Successfully connected to server");
      var db = client.db('PickMeUp');

      // Find some documents in our collection
      try {
        db.collection('ShuttleRiders').updateOne(
          {"riderID": Rider.riderID,
            "shuttleID":Rider.shuttleID},
          {
            $set:
            Rider
          }
        );
      } catch (e) {
        res.status(400).send(e)
      }
      client.close();
    });
  }
  res.status(200).send("All Shuttle riders been updated!");
  // Declare success
  console.log("Called find()");
});



//------//
app.post("/removeRiderShuttles", (req, res) => {
  console.log("got new post request");
  console.log(req.body.length)
  for(var i = 0 ; i < req.body.length ; i ++ ) {
    const Rider = {
      riderID: req.body[i].riderID,
      shuttleID: req.body[i].shuttleID,
      destination: req.body[i].destination,
      time: req.body[i].time,
      date: req.body[i].date
    };
    MongoClient.connect(uri, {useNewUrlParser: true}, function (err, client) {
      assert.equal(null, err);
      console.log("Successfully connected to server");
      var db = client.db('PickMeUp');

      // Find some documents in our collection
      try {
        db.collection('ShuttleRiders').deleteOne(
          {"riderID": Rider.riderID,
            "shuttleID":Rider.shuttleID,
            "time":Rider.time,
            "date":Rider.date,
            "destination":Rider.destination},
        );
      } catch (e) {
        res.status(400).send(e)
      }
      client.close();
    });
  }
  res.status(200).send("All Shuttle riders been deleted!");
  // Declare success
  console.log("Called find()");


});
//----------------D E L E T E-----------------------//
//------//
app.post("/deleteShuttle", (req, res) => {
  console.log("got new post request");
  console.log(req.body.length)

  MongoClient.connect(uri, {useNewUrlParser: true}, function (err, client) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');

    // Find some documents in our collection
    try {
      db.collection('Shuttles').deleteOne(
        {
          "shuttleID":req.body.shuttleID}
      );
    } catch (e) {
      res.status(400).send(e)
    }
    client.close();
  });
  res.status(200).send("Shuttle been deleted!");
  // Declare success
  console.log("Called find()");
});

//------//
app.post("/deleteShuttleRider", (req, res) => {
  console.log("got new post request");
  console.log(req.body.length)

  MongoClient.connect(uri, {useNewUrlParser: true}, function (err, client) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');

    // Find some documents in our collection
    try {
      db.collection('ShuttlesRiders').deleteOne(
        {
          "shuttleID":req.body.shuttleID,"riderID":req.body.riderID}
      );
    } catch (e) {
      res.status(400).send(e)
    }
    client.close();
  });
  res.status(200).send("Shuttle been deleted!");
  // Declare success
  console.log("Called find()");
});


app.post("/deleteLiftRider", (req, res) => {
  console.log("got new post request");
  console.log(req.body.length)

  MongoClient.connect(uri, {useNewUrlParser: true}, function (err, client) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');

    // Find some documents in our collection
    try {
      db.collection('LiftRiders').deleteOne(
        {
          "shuttleID":req.body.shuttleID,"riderID":req.body.riderID,"date":req.body.date,"direction":req.body.direction}
      );
    } catch (e) {
      res.status(400).send(e)
    }
    client.close();
  });
  res.status(200).send("LiftRider been deleted!");
  // Declare success
  console.log("Called find()");
});


//------//
app.post("/deleteSupervisor", (req, res) => {
  console.log("got new post request");
  MongoClient.connect(uri, {useNewUrlParser: true}, function (err, client) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    try {
      db.collection('Supervisors').deleteOne(
        {
          "supervisorID":req.body.supervisorID}
      );
    } catch (e) {
      res.status(400).send(e)
    }
    client.close();
  });
  res.status(200).send("Supervisor been deleted!");
  // Declare success
  console.log("Called find()");
});



//------//
app.post("/deleteUser", (req, res) => {
  console.log("got new post request");
  MongoClient.connect(uri, {useNewUrlParser: true}, function (err, client) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    try {
      db.collection('Users').deleteOne(
        {
          "userID":req.body.userID}
      );
    } catch (e) {
      res.status(400).send(e)
    }
    client.close();
  });
  res.status(200).send("User been deleted!");
  // Declare success
  console.log("Called find()");
});



//------//
app.post("/deleteLiftSupervisor", (req, res) => {
  console.log("got new post request");
  MongoClient.connect(uri, {useNewUrlParser: true}, function (err, client) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    // Find some documents in our collection
    try {
      db.collection('LiftSupervisor').deleteOne(
        {
          "supervisorID":req.body.supervisorID,"shuttleID":req.body.shuttleID,"date":req.body.date,"direction":req.body.direction}
      );
    } catch (e) {
      res.status(400).send(e)
    }
    client.close();
  });
  res.status(200).send("Supervisor been deleted!");
  // Declare success
  console.log("Called find()");
});



//------//
app.post("/deleteRider", (req, res) => {
  console.log("got new post request");
  MongoClient.connect(uri, {useNewUrlParser: true}, function (err, client) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    var db = client.db('PickMeUp');
    try {
      db.collection('Riders').deleteOne(
        {
          "riderID":req.body.riderID}
      );
    } catch (e) {
      res.status(400).send(e)
    }
    client.close();
  });
  res.status(200).send("Rider been deleted!");
  // Declare success
  console.log("Called find()");
});



//---------H E L P     F U N C T I O N S-------------//

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



app.post("/private", (req, res) => {
  const token = req.header("x-auth-token");
  // no token
  if (!token) res.status(401).send("Access denied. No token provided.");
  // verify token
  try {
    const decoded = jwt.verify(token, secret);
    req.decoded = decoded;
    if (req.decoded.admin)
      res.status(200).send({ result: "Hello admin." });
    else
      res.status(200).send({ result: "Hello user." });
  } catch (exception) {
    res.status(400).send("Invalid token.");
  }
});