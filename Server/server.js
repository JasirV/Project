const path =require('path')
const express=require('express');
const cors=require('cors')

const app=express();
const PORT=process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`Server run on ${PORT}`);
});