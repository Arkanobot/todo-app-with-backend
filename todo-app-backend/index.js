const express = require("express");
const ObjectID = require("mongodb").ObjectId;
const mongo = require("./mongodbConnect");
const cors = require("cors");
const app = express();
require("dotenv").config();
const env = require("./env");

//middleware to parse raw body in post call
app.use(express.json());
app.use(cors());
//selecting the collection from DB
const todoList = mongo.dbConnect(env.MONGO_URL);

//get the tasks list
app.get("/get-list", async (req, res) => {
  const resp = await todoList.find().toArray();
  res.header("Access-Control-Allow-Origin", "*");
  res.send(resp);
});

//adding tasks to tasks list
app.post("/add", async (req, res) => {
  if (
    !req.body.tasks ||
    req.body.tasks === "" ||
    (req.body.tasks === null && !req.body.prio)
  ) {
    // throw new Error("Name is a mandatory field.");
    res.status(400).send("{msg: Bad request - missing name / priority}");
  }
  let payLoad = {
    tasks: req.body.tasks,
    prio: req.body.prio,
    isCompleted: false,
    isDeleted: false,
  };

  const resp = await todoList.insertOne(payLoad);
  res.send(resp);
});

//editing a specific task
app.put("/get-list/:id", async (req, res) => {
  // We have to convert the normal ID to object ID
  const id = new ObjectID(req.params.id);
  const resp = await todoList.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        tasks: req.body.tasks,
        isCompleted: req.body.status,
      },
    }
  );
  console.log(resp);
  res.send("Updated");
});

//updating a specific task status to completed
app.patch("/get-list/completed/:id", async (req, res) => {
  const id = new ObjectID(req.params.id);
  const resp = await todoList.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        isCompleted: req.body.status,
      },
    }
  );
  res.send(resp);
});

//updating a specific task status to deleted -true
app.patch("/list/delete/:id", async (req, res) => {
  const id = new ObjectID(req.params.id);
  const resp = await todoList.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        isDeleted: req.body.status,
      },
    }
  );
  res.send(resp);
});

//starting the server
app.listen(env.PORT, () => console.log("Server listening on port " + env.PORT));
