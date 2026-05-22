const userModel=require('../models/user.model.js');
const jwt=require('jsonwebtoken');
const cookie= require("cookie-parser");
const bcrypt=require('bcryptjs');

 async function registerUser(req,res){

const{username,email,password,role='user'}=req.body;

const userAlredyExist=await userModel.findOne({
    $or:[
        {username},
        {email}
    ]
})

if(userAlredyExist){
    return res.status(409).json({
        message:"user already exixt"
    })
}
const hash=await bcrypt.hash(password,10)

const user=await userModel.create({
    username,
    email,
    password:hash,
    role
})

const token=jwt.sign({
   id:user._id,
   role:user.role
},process.env.JWT_SCRETE)

res.cookie("token",token);

res.status(201).json({
    message:"user created successfully",
    user:user
})


}
async function loginUser(req,res){
    
    const {username,email,password}=req.body;

    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(401).json({
            message:"invalid cridential"
        })
    }
   
    const passwordCheck=await bcrypt.compare(password, user.password);

    if(!passwordCheck){
        return res.status(401).json({
            message:"invalid credential"
        })
    }

    const token=jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SCRETE)
    
    res.cookie("token",token);

    res.status(200).json({
        message:"user logged sucessfully",
        user:user
    })
}
async function logoutUser(req,res){
    
 res.clearCookie("token")
 res.status(200).json({
    message:"logout successfully"
 })
}

module.exports={registerUser,loginUser,logoutUser};