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
        $("article").each(function(i, element){
            var title =$(element).find("span.entry-title-primary").text();
            var link = $(element).children().attr("href");
            titlesArray.push({
                title: title,
                link: link
            });
            Article.count({title:title}, function(err,test){
                if(test === 0){
                    var newArticle = new Article({title:title, link:link})
                    newArticle.save(function(err, doc){
                        if (err) return console.error(err);
                        console.log("Document inserted succussfully!");
                    })
                }
            })
            console.log(titlesArray)
        });

        // console.log(titlesArray)
    }).catch(function(err){
      console.log(err)
    })
});

router.get("/articles", function(req, res){
    
    Article.find().lean().sort({_id:-1}).exec(function(err,found){
        console.log(found)
        if (err){
            
            console.log(err)
        }
        else{
            var articl = { article: found}
            
            res.render("index", articl);
        }
    }
)})

module.exports = router