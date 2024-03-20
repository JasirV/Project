const mongoose =require('mongoose');
const Verification =require('../Models/emialVerification')
const Users=require("../Models/Users");
const { comparePassword } = require('../Utils/jwt');

const verifyEmail=async (req,res)=>{
    const {userId,token}=req.params;

try {
    const data=await Verification.findOne({userId})
    if(data){
        //token has expores
        if(data.expiresAt<Date.now()){
             Verification.findOneAndDelete({userId})
             .then(()=>{
                Users.findByIdAndDelete({_id:userId})
             
            .then(()=>{
                const message="Verification token has expired .";
                res.redirect(`users/verified?status=error&message=${message}`)
            })
            .catch((err)=>{
                res.redirect(`users/verified?status=error&message=`)
            });
        })
        .catch((err)=>{
            console.log(err);
            res.redirect(`/users/verified?message=`)
        })
        }else{
            //tollem valid

            comparePassword(token,data.token)
            .then((isMacth)=>{
                if(isMacth){
                    Users.findOneAndDelete({_id:userId},{verified:true})
                    .then(()=>{
                        Verification.findByIdAndDelete({userId}).then(()=>{
                            const message="Email verified Successfully";
                            res.redirect(`/users/verified?status=success&message=${message}`)
                        });
                    })
                    .catch((err)=>{
                        console.log(err);
                        const message="verification failed or link is invalid ";
                        res.redirect(`/users/verifies?status=errpr&,message=${message}`)
                    })
                    
                }else{
                    //invaild Token 
                    const message="verification failed or link is invalid";
                    res.redirect(`/users/verified?status=error&message=${message}`);
                }
            })
            .catch((error)=>{
                console.log(error);
                res.redirect(`/users/verified?message=`)
            })
        }
    }
} catch (error) {
    console.log(error);
    res.status(404).json({
        status:'failed',
        message:error.message
    })
}

    
}

module.exports=verifyEmail