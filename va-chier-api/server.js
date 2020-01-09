"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes");
var app = express();
var cors = require("cors");

app.use(cors({ credentials: true, origin: "http://localhost:8082" }));

app.use(function(req, res, next) {
  const auth = { login: "tamere", password: "10tamere01" };
  const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
  const [login, password] = Buffer.from(b64auth, "base64")
    .toString()
    .split(":");

  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }
  console.log(login + " " + password);
  console.log("Auth failed");
  res.set("WWW-Authenticate", 'Basic realm="401"'); // change this
  res.status(401).send("Authentication required."); // custom message
});

function main() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api/", routes);

  var port = 8080;

  app.listen(port, () => {
    console.log("*******************************************************");
    console.log("api-va-chier port: " + port);
    console.log("*******************************************************");
  });
}
main();
