var express = require("express");
var expresshbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require('../models');

router.get("", function(res,req) {
    var options = {
        uri: "https://www.reductress.com/",
        transform: function(body) {
            return cheerio.load(body);
        }
    };

    db.Article
      .find({})
      .then((saved)) => {
        var savedArticleTitle = 
      }

})