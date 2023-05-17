const {default:mongoose}=require("mongoose");
const UserSchema=new mongoose.Schema({
frist_name:{type:String},
last_name:{type:String},
user_name:{type:String,lowercase:true},
mobile:{type:String,required:true,unique:true},
email:{type:String,lowercase:true},
password:{type:String},
otp:{type:Object,default:{ //A one-time password
    code:0,
    expiresIn:0
}},
bills:{type:[],default:[]},
discount:{type:Number,default:0},
brithday:{type:String},
accesstoken:{type:String,default:''},
RefreshToken:{type:String,default:''},
Roles:{type:[String],default:["USER"]},
course:{type:[mongoose.Types.ObjectId],ref:"course",default:[]}    
},
{
    timestamps : true,
    toJSON : {
        virtuals : true
    }
});
UserSchema.index({first_name:"text",last_name:"text",user_name:"text",mobile:"text",email:"text"})
module.exports={
    UserModel:mongoose.model("user",UserSchema)
}