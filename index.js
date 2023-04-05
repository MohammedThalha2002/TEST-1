const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname + "/static")))

const sql = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "forms",
  })
  .promise();

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/static/index.html")
})

app.get("/get-posts", async (req, res) => {
  const query = "select * from forms";
  const [output] = await sql.query(query);
  res.send(output);
});

app.post("/post-data", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const query = "insert into forms(name, email) values(?,?)";

  const output = await sql.query(query, [username, email]);

  res.send("Posted successfully");
});

app.listen(3000, (e) => {
  console.log("LISTENING...");
});
