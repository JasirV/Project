const express =require('express')
const path =require('path')
const verifyEmail = require('../Controller/otpController')

const Router=express.Router()
const __dirname=path.resolve(path.dirname(""))

Router.get("/verfy/:userId/:token",verifyEmail)
Router.get("/verified",(req,res)=>{
    res.sendFile(path.join(__dirname,'./view/verifiedpage.html'));
})