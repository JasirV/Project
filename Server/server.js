
const dotenv =require("dotenv")
const app=require("./app");

dotenv.config({path:'./.env'});
const connect=require('./config/config')

const PORT=process.env.PORT||3001;


connect()

app.listen(PORT,()=>{
    console.log(`Server run on ${PORT}`);
});