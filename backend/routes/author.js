const {Router}= require("express");
const authorRouter = Router();
const bcrypt = require("bcrypt");
const {authorModel, blogModel} = require("../db");
const {z, any} = require("zod");
const jwt = require("jsonwebtoken");
const jwt_pass = process.env.JWT_SECRET_KEY_author;
const {authAuthor} = require("../middleware/author");
authorRouter.post('/create', authAuthor, async(req,res)=>{
    const authorId = req.userId;
    const {title, description, image_url, price} = req.body;

    const blog = await blogModel.create({
        title : title,
        description : description,
        price : price,
        image_url : image_url,
        creator_id : authorId
    })
    res.json({
        message : "blog Successfully Created",
        blogID : blog._id
    })
    
})
authorRouter.post('/signup', async (req,res)=>{
    
    const requiredBody = z.object({
        email : z.string().min(5).max(100).email(),
        password : z.string().min(3,"Password must contain atleast 5 characters").max(20),
        firstName : z.string().min(3).max(30),
        lastName : z.string().min(3).max(30)
    })

    const parsedDatawithSuccess = requiredBody.safeParse(req.body);
    if(!parsedDatawithSuccess.success){
        res.json({
            message : "Incorrect format",
            error : parsedDatawithSuccess.error
        })
        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;


    const existingUser = await authorModel.findOne({ email: email });
    if (existingUser) {
        return res.json({
            message: "You are already signed up!"
        });
    }
    let errorThrown =false;
    try{
         await authorModel.create({
            email : email,
            password : hashedPassword,
            firstName : firstName,
            lastName : lastName
        })
        res.json({
            message : "You have successfully signed up!"
        })
    }
    catch(e){
        errorThrown = true;
        console.log(e)
    }
    if (errorThrown){
        res.json({
            message : "Error in creating author model!",
        })
    }
})

authorRouter.post('/login', async (req,res)=>{
    const email = req.body.email;
    
    const author = await authorModel.findOne({email : email});
    if(!author){
        
        res.json({
            message : "No authors found with this email id!"
        })
        return;
    }
    const password = req.body.password;
        const passwordMatch = await bcrypt.compare(password, author.password);
        if(passwordMatch){
            const token = await jwt.sign({id : author._id},jwt_pass);
            res.json({
                message : "You are successfully signed in!",
                token : token
            })
        }else{
            res.json({
                message : "Password does not match!"
            })
            
        }
    
})
authorRouter.put('/update/:id', authAuthor, async (req,res)=>{
    const blogID = req.params.id;
    const {title, description, image_url, price} = req.body;
    const blog = await blogModel.findOne({
        _id : blogID,
        creator_id : req.userId
    })
    if(!blog){
        res.json({
            message : "This user has no access to this blog!"
        })
        return;
    }
    const updatedblog = await blogModel.findByIdAndUpdate(blogID,{title : title, description : description, price : price, image_url : image_url},{new : true});
    if (!updatedblog) {
        return res.status(404).json({ message: "blog not found" });
    }

    res.send({
        message : "blog updated successfully!",
        updatedblog
    })
})
authorRouter.get('/blog', authAuthor, async (req,res)=>{
    const blog = await blogModel.find({creator_id : req.userId});
    res.send({
        blog
    })
})
module.exports = {
    authorRouter : authorRouter
}