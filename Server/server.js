const path =require('path')
const express=require('express');
const cors=require('cors')
const dotenv =require("dotenv")
const bodyParse =require('body-parser')
const helmet=require('helmet')
const app=express();

dotenv.config();

const PORT=process.env.PORT||3001;




app.listen(PORT,()=>{
    console.log(`Server run on ${PORT}`);
});