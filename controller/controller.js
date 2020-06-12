//Requires Set
var express = require("express");
var router = express.Router();
var path = require("path");

var axios = require("axios");
var cheerio = require("cheerio");

var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

//Route GET '/' 
router.get("/", function(req, res){
    //use res.redirect() to go to route '/articles'
    res.redirect("/articles");
})

//Route GET '/scrape'
router.get("/scrape", function(req, res){
    //Use axios to get a response 
    axios.get("https://sciworthy.com/?gclid=Cj0KCQjwiYL3BRDVARIsAF9E4GdTweUqCuwywMtMZA-vJYvoU0TLFNiyqVod8ictSfcUP2buBHnyBAoaAhDsEALw_wcB").then(function(res){
        //declare Variables for cheerio and an empty array
        var $ = cheerio.load(res.data);
        var titlesArray = [];
        //Using cheerio to scope.
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

//Route GET '/clearAll'
router.get("/clealAll", function(req, res){
    //call to Article and use .remove({}) 
    Article.remove({}, function(err, found){
        //If Error Log Error
        if (err){
            console.log(err);
        }
        //if no errors then Log a message
        else{
           console.log("Removed All Articles!");
        }
    });
    //redirect to '/article-json'
    res.redirect("/articles-json");
});

//Route GET '/readArticle/:id'
router.get("/readArticle/:id", function(req, res){
    var articleId = req.params.id;
    // var hbsObj ={
    //     article: [],
    //     body: []
    // }
    Article.findOne({_id:articleId})
    .populate("comment").then(function(found){
       // declarying title & link
            hbsObj = found.title
            var link = found.link
            console.log("link:",link)
            console.log("Title:",hbsObj)

            //axios call with link
            axios.get(link).then(function(res){
                var $ = cheerio.load(res.data);
                var fullArticalArray = []
               
                
                $("article").each(function(i, element){
                    
                    //Setting & Grabbing title, title summary, top image and article body text.    
                    
                    //Title Text            
                    var title =$(element).find("span.entry-title-primary").text();
                    //Title summary Text
                    var titleSum =$(element).find("span.entry-subtitle").text();
                    //Image
                    var image =$(element).find("img").attr("src");
                    //Body Text
                    var body =$(element).find("p").text().trim();
                    
                    //then push all vars to empty array
                    fullArticalArray.push({
                        title:title,
                        titleSum:titleSum,
                        image:image,
                        body:body
                    })
                    
                })
                //*TEST*
                console.log(articalArray)
                
            })
     //Catch & Log Errors   
    }).catch(function(err){
        console.log(err);
      });
})





module.exports = router