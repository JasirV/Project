const monsgoose=require('mongoose')
const Schema=monsgoose.Schema;
const bcrypt=require('bcryptjs')
const Post=require('./Post')
const Comment=require('./Comment')
const Reaction=require('./Reactions')
const Friends=require('./Friends')
const Notificationi=require('./Notification')
const {generateFromEmail}=require('unique-username-generator')

const UserSchema=new Schema(
    {
        firstName:{
            type:String,
            require:true
        },
        lastName:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            require:true
        },
        userName:{
            type:String,
            require:true,
            trim:true,
            unique:true,
            text:true
        },
        brithYear:{
            type:Number,
            require:true,
            trim:true
        },
        brithMonth:{
            type:Number,
            require:true,
            trim:true
        },
        brithDay:{
            type:Number,
            require:true,
            trim:true
        },
        gender:{
            type:String,
            eunm:["male","female"],
            require:true
        },
        photo:{
            type:String,
            default:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
        },
        cover:{type:String},
        details:{
            bio:{
                type:String,
            },
            job:{
                type:String
            },
            workPlace:{
                type:String
            },
            highSchool:{
                type:String
            },
            collage:{
                type:String
            },
            currentCity:{
                type:String,
            },
            homeTown:{
                type:String
            },
            relationShip:{
                type:String,
                enum:["Single","Marrid","RelationShip"]
            }
        },
        instagram:{
            type:String
        },
    },
    {timestamps:true}
)

//Post removeing

UserSchema.pre('remove',async (next)=>{
    const user=this;
    await Post.deleteMany({owner:user._id});
    next()
});

//remove reactions

UserSchema.pre('remove',async (next)=>{
    const user=this;
    await Reaction.deleteMany({owner:user._id})
    next();
})

//remove Comment 

UserSchema.pre('remove',async (next)=>{
    const user=this;
    await Comment.deleteMany({owner:user._id})
    next()
})



//remove Friends

UserSchema.pre('remove',async (next)=>{
    const user=this;
    await Friends.deleteMany({
        $or:[{sender:user._id},{recipint:user._id}]
    })
    next()
})

//remove notification 

UserSchema.pre('remove',async (next)=>{
    const user=this
    await Notificationi.deleteMany({
        $or:[{sender:user._id},{recipint:user._id}]
    })
    next()
})


//generate Username

UserSchema.pre('save',(next)=>{
    if(this.isNew){
        const user=this;
        user.userName=generateFromEmail(user.email,4)
    }
    next();
})

// password bcrypt

UserSchema.pre("save", async function (next) {
    try {
      if (!this.isModified("password")) {
        return next();
      }
  
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error) {
      console.log("Error hashing password", error);
      next(error);
    }
  });
  UserSchema.method.comarePassword = async (password, passwordDB) => {
    return await bcrypt.compare(password, passwordDB);
  };
  

module.exports=monsgoose.model('user',UserSchema)