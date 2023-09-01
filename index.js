const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./configs/db");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(8080, async () => {
  try {
    await dbConnection;
    console.log("Connected to db");
  } catch (e) {
    console.log(e.message);
  }
  console.log("listening on port 8080");
});