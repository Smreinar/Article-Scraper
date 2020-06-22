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
            var titleSum =$(element).find("span.entry-subtitle").text().trim();
            var link = $(element).children().attr("href");
            var image =$(element).find("img").attr("src");
            var  body = ""
            //Make a Push to the emptry array with title and link with values 
            titlesArray.push({
                title: title,
                link: link,
                titleSum: titleSum,
                image:image,
                body:body
            });
            //calling Article .count() with title 
            Article.count({title:title}, function(err,test){
                //if title count is 0 then it does not exsist 
                if(test === 0){
                    //If true make a new article 
                    var newArticle = new Article({title:title, link:link, titleSum:titleSum, image:image, body:body})
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
    Article.find({saved:false}).lean().sort({_id:-1}).exec(function(err,found){
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

router.get("/savedArticles", function(req, res){
    //Find all articles and sort by id
    Article.find({saved:true}).lean().sort({_id:-1}).exec(function(err,found){
        // console.log(found);

        //if err log err
        if (err){
            
            console.log(err);
        }
        //otherwise use res.render() to 'index'
        else{
            //set variable to render 'found'
            var articl = { savedArticles: found}
            
            res.render("saved", articl);
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
router.get("/clearAll", function(req, res){
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
router.delete("/api/articles/:id", function(req, res){
    var id = req.params.id;
    //call to Article and use .remove({}) 
    Article.remove({_id: id}, function(err, found){
        //If Error Log Error
        if (err){
            console.log(err);
        }
        //if no errors then Log a message
        else{
           console.log("Removed All Articles!");
    
        }
        res.json(found);
    });
    //redirect to '/article-json'

});

//Route GET '/readArticle/:id'
router.get("/readArticle/:id", function(req, res){
    var articleId = req.params.id;

    Article.findOne({_id:articleId})
    .populate("Comment").then(function(dbArticle){
       // declarying title & link
            // hbsObj = found.title;
            var link = dbArticle.link;
            var id = dbArticle.id
            

            console.log("WOOOOT",dbArticle);
        res.render("article", {comment:dbArticle});
     //Catch & Log Errors   
    }).catch(function(err){
        console.log(err);
    });
});

router.put("/api/articles/:id",function(req, res){
    var id = req.params.id;
    Article.update({_id: id},{saved: true}).then(function(results){
        res.json(results);
    })
})
//Route
router.post("/comment/:id",function(req, res){
    var userName = req.body.userName;
    var body = req.body.comBody;
    var id = req.params.id;
    console.log("UserName",userName,"body:",body)
    console.log(id);

    Comment.create(req.body).then(function(dbcomment){
        return Article.findOneAndUpdate({_id: req.params.id},{$push:{ comment: dbcomment._id}},{new: true});
    }).then(function(dbArticle){
        console.log(dbArticle);
        Article.findOne({_id:req.params.id})
        .populate("comment").then(function(dbArticle){
           // declarying title & link
             
    
                console.log("WOOOOT",dbArticle);

                var newComment = dbArticle.comment.map(comment=>{
                    return {
                        _id: comment._id,
                        userName: comment.userName,
                        comBody: comment.comBody
                    }
                })
                console.log('UNICORN',newComment)
            res.render("article", {comment:newComment});
         //Catch & Log Errors   
        }).catch(function(err){
            console.log(err);
        });
        
    }).catch(function(err){
       res.json(err);
    })

    // var newComment = new Comment({username:username,body:body});

    // newComment.save(function(err, doc){
    //     console.log(doc)
    //     if (err) return console.error(err);
    //     console.log("Document inserted succussfully!");

    //     Article.findOneAndUpdate(
    //         {_id: req.params.id},
    //         {$push:{ comment:}},
    //         {new: true}
    //     ).exec(function(err, doc){
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             res.redirect("/readArticle/"+ articleId);
    //         }
    //     });
    // });


});




module.exports = router