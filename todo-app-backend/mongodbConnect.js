const { MongoClient } = require("mongodb");

exports.dbConnect = (connectionString) => {
  const client = new MongoClient(connectionString);
  //connecting the client to the server
  client.connect();
  //establish and verify connection
  return client.db("todo-list-backend").collection("tasks");
};
