//Requires Set
var express = require("express");
var router = express.Router();
var path = require("path");

var axios = require("axios");
var cheerio = require("cheerio");

var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

router.get("/", function(req, res){
    res.redirect("/articles");
})

router.get("/scrape", function(req, res){
    axios.get("https://sciworthy.com/?gclid=Cj0KCQjwiYL3BRDVARIsAF9E4GdTweUqCuwywMtMZA-vJYvoU0TLFNiyqVod8ictSfcUP2buBHnyBAoaAhDsEALw_wcB").then(function(res){
        var $ = cheerio.load(res.data);
        var titlesArray = [];
        $("div.fg-item").each(function(i, element){
            var title =$(element).find("h2").text();
            var link = $(element).children().attr("href");
            titlesArray.push({
                title: title,
                link: link
            });
        });
        console.log(titlesArray)
    }).catch(function(err){
      console.log(err)
    })
});

module.exports = router