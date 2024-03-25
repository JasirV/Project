const UserSchema=require("../Models/Users")
const bcrypt =require('bcryptjs');
const sendVerificationEmail = require("../Utils/sendEmail");
const { hashStrting, comparePassword, tokengenerator } = require("../Utils/jwt");
const path = require('path');

const register=async(req,res)=>{
    const {firstName,lastName,email,password,userName}=req.body;

    //Validation

    if(!firstName||!lastName||!email||!password){
        return res.status(400).json({
            status:'fail',
            message:"fil The Form Complele"
        })
    }
    try {
        const userExit= await UserSchema.findOne({email})

        if(userExit){
            return res.status(400).json({
                status:"success",
                message:'This User Olderay exist'
            })
        }
        const hashedPassword =await hashStrting(password)
        const user=await UserSchema.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            
        })
        const token=tokengenerator(user._id) 
        sendVerificationEmail(user,res,token)
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message})
    }
}

const loginUser=async (req,res)=>{
    const { userName, password } = req.body;
    const {email}=req.body;

    // const respons=await ChekEmail()
    // $or: [{ userName: userName },
    const user = await UserSchema.findOne(  { email: email }).select('+password');
    if(!user){
        return res.status(400).json({
            status:'fail',
            message:"Invalid Input"
        })
    }
    console.log(user);
    if(!user?.verified){
        return res.status(404).json({
            status:'failed',
            message:'User email is not verified .Check your email account and verify your eamil'
        })
    }
    if(!user.password){
        return res.status(400).json({
            status:"fail",
            message:'Invalid Inputs'
        })
    }
    //comapre password
    const matchPassword=await comparePassword(password,user.password);
    if(!matchPassword){
        return res.status(401).json({
            status:'fail',
            message:'Authentication Failed'
        })
    }
    // const token=

    res.sendFile(path.join(__dirname,''));
}

const profilesetion=async (req,res)=>{
    const {userId}=req.body;
    console.log(userId);
    if(!userId){
        return res.status(404).json({
            status:"fail",
            message:"Need For User"
        })
    }
    const user= await UserSchema.findOne({_id:userId})
    console.log(user);
    if(!user){
        return res.status(404).json({
            status:'fail',
            message:'User Not Found The User Datas'
        })
    }
    res.status(200).json({
        status:"success",
        message:"successfully fecth the user",
        data:user
    })
}


module.exports={
    loginUser,register,profilesetion
}