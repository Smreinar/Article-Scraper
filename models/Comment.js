var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var CommentSchema = new Schema({
    
    userName: {
        type: String,
        required: true
    },
    comBody: {
        type: String,
        required: true
    }

    

});

var Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;