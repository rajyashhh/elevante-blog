const {Router} = require("express");
const { blogModel, purchaseModel, userModel } = require("../db");
const {authUser} = require("../middleware/user")
const blogRouter = Router();

blogRouter.get('/preview', async (req,res)=>{
    const blog = await blogModel.find({})
    console.log(blog);
    res.send({
        blog
    })
})


module.exports = {
    blogRouter : blogRouter
}