"use strict";
require("dotenv").config();
const express = require("express");
const myDB = require("./connection");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const app = express();
const ObjectID = require("mongodb");
const mongo = require("mongodb").MongoClient;

app.set("view engine", "pug");
app.set("views", "./views/pug");

let session = require("express-session");
let passport = require("passport");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (request, response) => {
  response.render("index", { title: "Hello", message: "Please log in" });
});

let URI =
  "mongodb+srv://testuser41:<Kurtturuusu66>@cluster0.hgejp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongo.connect(URI, (err, db)) => {
  if(err)
}
myDB(async (client) => {
  const myDataBase = await client.db("database").collection("users");

  // Be sure to change the title
  app.route("/").get((req, res) => {
    // Change the response to render the Pug template
    res.render("index", {
      title: "Connected to Database",
      message: "Please login",
    });
  });

  //save user id to a cookie
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  //retrieve user details from cookie
  passport.deserializeUser((id, done) => {
    myDB.findOne({ _id: new ObjectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });
}).catch((e) => {
  app.route("/").get((req, res) => {
    res.render("index", { title: e, message: "Unable to connect to database" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

fccTesting(app); //For FCC testing purposes
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route("/").get((req, res) => {});
