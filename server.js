var express = require("express");
var expresshbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var axios = require("axios");
var cheerio = require("cheerio");

//Require models
var db = require("./models");;

const PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static("public"));

mongoose.Promice = Promise;
mongoose.connect("mongodb://localhost/18hwPopulater", {
    useMongoClient: true
});



app.get("/scrape", function(req, res) {
    axios.get("https://www.echojs.com/").then(function(response) {
        var $ = cheerio.load(response.data);

        $("article h2").each(function(i, element) {
            var result = {};

            result.title = $(this)
             .children("a")
             .text();
            result.link = $(this)
             .children("a")
             .attr("href");

            db.Article.create(result)
             .then(function(dbArticle) {
                console.log(dbArticle);
             })
             .catch(function(err) {
                return res.json(err);
             });
        });
        res.send("Scrape Complete");
    });
});

app.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  
  app.listen(PORT, function() {
    console.log("App running on port " + PORT);
  });