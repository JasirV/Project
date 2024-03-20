const UserSchema=require("../Models/Users")
const bcrypt =require('bcryptjs');
const {sendVerificationEmail} = require("../Utils/sendEmail");
const { hashStrting } = require("../Utils/jwt");

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
            userName,
            email,
            password:hashedPassword,
            
        })
        //send password verificatrion 
        sendVerificationEmail(user,res)
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message})
    }
}

const loginUser=async (req,res)=>{
    const { userName, password } = req.body;

    const user = await UserSchema.findOne({ $or: [{ userName: userName }, { email: email }] }).select('+password');
    if(!user){
        return res.status(400).json({
            status:'fail',
            message:"Invalid Input"
        })
    }
    if(!userName||!user.password){
        return res.status(400).json({
            status:"fail",
            message:'Invalid Inputs'
        })
    }

    const matchPassword=await bcrypt.compare(password,user.password);
    if(!matchPassword){
        return res.status(401).json({
            status:'fail',
            message:'Authentication Failed'
        })
    }
    // const token=

    res.status(200).json({
        status:'success',
        message:'Authentication Successful',
        data:{
            user
        }
    })
}


module.exports={
    loginUser,register
}