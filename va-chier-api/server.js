"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes");
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

function main() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api/", routes);

  var port = 20100;

  app.listen(port, () => {
    console.log("*******************************************************");
    console.log("api-va-chier port: " + port);
    console.log("*******************************************************");
  });
}
main();
