const express=require('express')
const userRouter=require('./Routes/userRoutes')
const app=express();
const path=require('path');
const Router = require('./Routes/otpRoutes');
app.set('views',path.join(__dirname,'views'));
app.use(express.json());
app.use('/',userRouter);
app.use("/user",Router)

module.exports=app