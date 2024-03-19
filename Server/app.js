const express=require('express')
const userRouter=require('./Routes/userRoutes')
const app=express();
const path=require('path')
app.set('views',path.join(__dirname,'views'));
app.use(express.json());
app.use('/user',userRouter);

module.exports=app