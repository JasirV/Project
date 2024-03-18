const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const FriendSchema=new Schema(
    {
        sender:{type:Schema.Types.ObjectId,ref:'user',required:true},
        recipient:{
            type:Schema.Types.ObjectId,

            ref:"user",
            required:true
        },
        requesStatus:{
            type:String,
            enum:["pending","accepted","canelled"],
            required:true
        },
    },
    {timestamps:true}
);

module.exports=mongoose.model("friend",FriendSchema)