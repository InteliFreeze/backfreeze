const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, (req, res) => {
  console.log(`App running on port ${port}...`);
  console.log("among us");
  console.log("penis");
  console.log("sus sus");
  console.log("sus")
  console.log("among us")
  console.log("yes")

});

app.use((req, res, next) => {
  res.send("hello")
  next();
});
