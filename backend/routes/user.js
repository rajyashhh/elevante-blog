// const express = require ("express");
// const Router = express.Router;

const bcrypt = require("bcrypt");
const {userModel} = require("../db");

const {z} = require("zod");
const jwt = require("jsonwebtoken");
const { authUser } = require("../middleware/user");
const jwt_pass = process.env.JWT_SECRET_KEY_USER;

const {Router} = require("express");
const userRouter = Router();

userRouter.post('/signup', async (req,res)=>{
    const requiredBody = z.object({
        email : z.string().min(5).max(100).email(),
        password : z.string().min(3,"Password must contain atleast 5 characters").max(20),
        name : z.string().min(3).max(30)
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
    const name = req.body.name;


    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
        return res.json({
            message: "You are already signed up!"
        });
    }
    let errorThrown =false;
    try{
         await userModel.create({
            email : email,
            password : hashedPassword,
            name : name
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
            message : "Error in creating user model!",
        })
    }
})

userRouter.post('/login', async(req,res)=>{
    const email = req.body.email;
    
    const user = await userModel.findOne({email : email});
    if(!user){
        
        res.json({
            message : "No users found with this email id!"
        })
        return;
    }
    const password = req.body.password;
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch){
            const token = await jwt.sign({id : user._id},jwt_pass);
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


module.exports= {
    userRouter : userRouter
}