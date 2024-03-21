const mongoose =require('mongoose');
const Verification =require('../Models/emialVerification')
const Users=require("../Models/Users");
const { comparePassword } = require('../Utils/jwt');
const ChekEmail = require('../Utils/VerifiyEmail');

const verifyEmail=async (req,res)=>{
    const {token}=req.params;
    if(!token){
        return res.status(404).json({
            status:'failed',
            message:'User Id Or Token Not Get '
        })
    }
    
    const respons=await ChekEmail(token)
    res.status(200).json({
        status:'success',
        data:{
            respons
        }
    })

}

module.exports=verifyEmail