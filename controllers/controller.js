var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var Request = require('request');
var Article = require("../models/Article.js");
var Note = require("../models/Note.js");

router.get('/', function(res, req) {
    res. redirect('/scrape');
});

router.get("/Article", function(res, req) {

});

router.get('/scrape', function(res, req) {
    request('http://reductress.com/', function(res, err, html) {
        var $ = cheerio.load(html);
        var titleArray = [];
        $('.article')
    })
})