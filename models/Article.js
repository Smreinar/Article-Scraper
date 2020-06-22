var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    titleSum:{
        type: String,
        require: false
    },
    date:{
        type: Date,
        require: false
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type:String,
        require: false
    },
    body:{
        type:String,
        require: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;