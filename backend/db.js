const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongoose_url = process.env.mongo_url;
mongoose.connect(mongoose_url);
const userSchema = new Schema({
    id : ObjectId,
    email : {type: String, unique :true},
    password : String,
    name : String
})

const authorSchema = new Schema({
    id : ObjectId,
    email : {type: String, unique :true},
    password : String,
    name : String
})

const blogSchema = new Schema({
    id : ObjectId,
    title : String,
    body : String,
    image_url : String,
    author_id : ObjectId
})



const userModel = mongoose.model("users", userSchema);
const authorModel = mongoose.model("authors", authorSchema);
const blogModel = mongoose.model("blogs", blogSchema);


module.exports = {
    userModel,
    authorModel,
    blogModel
}