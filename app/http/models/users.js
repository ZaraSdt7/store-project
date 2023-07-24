const {default:mongoose}=require("mongoose");
const ProductSchema = new mongoose.Schema({
productID : {type:mongoose.Types.ObjectId , ref:"product"},
count : {type: Number , default:1}    
})
const CourseSchema = new mongoose.Schema({
courseID : {type:mongoose.Types.ObjectId , ref:"course"},
count : {type: Number , default:1}    
})
const BascketSchema = new mongoose.Schema({
courses : {type: [CourseSchema],default:[]},
products : {type: [ProductSchema] , default:[]}
})
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
Role:{type:String,default:"USER"},
Courses:{type:[mongoose.Types.ObjectId],ref:"course",default:[]},
Products:{type:[mongoose.Types.ObjectId],ref:"product",default:[]},   
bascket:{type:BascketSchema}     
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