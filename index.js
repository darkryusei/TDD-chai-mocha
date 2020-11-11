const express = require("express");

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.send({ message: "Hello" });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/post", (req, res) => {
  let data = {
    data1: req.body.name,
    data2: req.body.age,
    data3: req.body.nickname,
  };
  res.status(200).send(data);
});

module.exports = app.listen(3000, console.log("APP LISTEN ON PORT 3000"));
