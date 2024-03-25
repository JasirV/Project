const express=require('express')
const userController=require('../Controller/userController')
const userRouter=express.Router()


userRouter.post('/register',userController.register)
.post("/login",userController.loginUser)
.get('/profilesection',userController.profilesetion)



module.exports=userRouter