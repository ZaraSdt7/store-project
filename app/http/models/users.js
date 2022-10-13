const {default:mongoose}=require("mongoose");
const Schema=new mongoose.Schema({
frist_name:{type:String},
last_name:{type:String},
user_name:{type:String,lowercase:true},
mobile:{type:String,required:true},
email:{type:String,lowercase:true},
password:{type:String},
otp:{type:Object,default:{ //A one-time password
    code:0,
    expiresIn:0
}},
bills:{type:[],default:[]},
discount:{type:Number,default:0},
brithday:{type:String},
Roles:{type:[String],default:["USER"]}    
})
module.exports={
    UserModel:mongoose.model("user",Schema)
}