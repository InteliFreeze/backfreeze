const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, (req, res) => {
  console.log(`App running on port ${port}...`);
});



app.use((req, res, next) => {
  res.send("hello");
  next();
});
