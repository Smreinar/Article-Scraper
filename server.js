//requires 
var mongoose = require("mongoose");
var express = require("express");

//setting vars
var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controller/controller.js")
app.use(routes)

mongoose.connect("mongodb://localhost/Article-Scraper");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
  console.log("Connected To Mongoose!");
});

app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });
