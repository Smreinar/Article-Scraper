$(".saveArtBut").on("click", function(){
    var id = $(this).attr("data-id");
    
    $.ajax({
        url:"/api/articles/"+ id,
        method: "PUT" 
    }).then(function(results){
        location.reload();
    })
})

$(".deleteArtBut").on("click", function(){
    var id = $(this).attr("data-id");
    
    $.ajax({
        url:"/api/articles/"+ id,
        method: "DELETE" 
    }).then(function(results){
        location.reload();
    })
})

$("#btnSignUp").on("click", function(){
    var id = $(this).attr("data-id");
    $.ajax({
        url:"/readArticle/"+id,
        method: "GET"

    }).then(function(results){
        console.log(results)
    })
})

$("#commentForm").submit( function(e){
    e.preventDefault();
   
    var url = window.location.pathname.split("/")
    var id = url[url.length - 1]
    var username = $("#userText").val();//TEST GOOD
    var body = $("#commentText").val();//TEST GOOD
    // console.log(`USERNAME: ${username}`);
    // console.log(`ID:${id}`);
    // console.log(`BODY: ${body}`);
    
    
    $.ajax({
        url:"/comment/"+ id,
        method: "POST",
        data: {
          
            userName: $("#userText").val(),
            comBody: $("#commentText").val()
        }
    }).then(function(results){
        console.log(results);
         
    });
});

  