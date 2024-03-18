const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const Comment=require('./Comment')
const Reaction=require('./Reactions')


const PostSchema=new Schema(
    {
        owner:{
            type:Schema.Types.ObjectId,
            ref:"user",
            required:treu
        },
        text:{
            type:String,
            required:true
        },
        image:{
            type:String,
            default:"No Posts"
        },
        cloudinary_id:{
            type:String
        },
    },
    {timestamps:true}
);

//delete Post Comments

PostSchema.pre('remove',async(next)=>{
    const post =this;
    await Comment.deleteMany({post:post_id});
    next()
})



// Delete Post Reactioins

PostSchema.pre("remove",async (next)=>{
    const post =this
    await Reaction.deleteMany({post:post_id});
    next()
});
module.exports=mongoose.model("post",PostSchema)