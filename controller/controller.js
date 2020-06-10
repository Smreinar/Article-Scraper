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

//Route GET '/scrape'
router.get("/scrape", function(req, res){
    //Use axios to get a response 
    axios.get("https://sciworthy.com/?gclid=Cj0KCQjwiYL3BRDVARIsAF9E4GdTweUqCuwywMtMZA-vJYvoU0TLFNiyqVod8ictSfcUP2buBHnyBAoaAhDsEALw_wcB").then(function(res){
        //declare Variables for cheerio and an empty array
        var $ = cheerio.load(res.data);
        var titlesArray = [];
        //Using jQuery to scope.
        $("article").each(function(i, element){
            //Declare Variables for Title and Link scoped to each article 
            var title =$(element).find("span.entry-title-primary").text();
            var link = $(element).children().attr("href");
            //Make a Push to the emptry array with title and link with values 
            titlesArray.push({
                title: title,
                link: link
            });
            //calling Article .count() with title 
            Article.count({title:title}, function(err,test){
                //if title count is 0 then it does not exsist 
                if(test === 0){
                    //If true make a new article 
                    var newArticle = new Article({title:title, link:link})
                    //Then save new Article to database 
                    newArticle.save(function(err, doc){
                        if (err) return console.error(err);
                        console.log("Document inserted succussfully!");
                    });
                }
            });
            
        });

        // console.log(titlesArray)
    //catch errors
    }).catch(function(err){
      console.log(err);
    });
});

//Route GET '/articles'
router.get("/articles", function(req, res){
    //Find all articles and sort by id
    Article.find().lean().sort({_id:-1}).exec(function(err,found){
        // console.log(found);

        //if err log err
        if (err){
            
            console.log(err);
        }
        //otherwise use res.render() to 'index'
        else{
            //set variable to render 'found'
            var articl = { article: found}
            
            res.render("index", articl);
        }
    }
)});

//Route GET '/articles-json'
router.get("/articles-json", function(req, res){
    //call Artical and use find() to get All articles
    Article.find({}, function(err, found){

        //If err Log err
        if(err){
            console.log(err);
        }
        //otherwise display in browser with .json() format 
        else{
            res.json(found);
        }
    });

});

module.exports = router