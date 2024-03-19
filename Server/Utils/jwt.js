const jwt =require('jsonwebtoken');
require('dotenv').config()

const tokengenerator=(id)=>{
    try {
        const token =jwt.sign({id:id},process.env.USER_ACCES_TOKEN_SECRET,{
            expiresIn:"id"
        })
        return token
    } catch (error) {
        console.error("Error generating token",error);
        return null
    }
};

module.exports=tokengenerator