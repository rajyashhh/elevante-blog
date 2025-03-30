require("dotenv").config();
const express = require ("express");
const app = express();
const {userRouter}=require("./routes/user")

const {authorRouter}=require("./routes/author")
const {blogRouter}=require("./routes/blogs")
const mongoose = require("mongoose");
const port = process.env.port;
app.use(express.json());
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/author', authorRouter)


async function main(){
    const mongoose_url = process.env.mongo_url;
    await mongoose.connect(mongoose_url);
    app.listen(port, console.log(`Server is starting on local host with port number ${port}`))
}

main();