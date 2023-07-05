const {default:mongoose}=require("mongoose");
const AnswerSchema=new mongoose.Schema({
user:{type:mongoose.Types.ObjectId,ref:"user",required:true},
comment:{type:String,required:true},
parent:{type:mongoose.Types.ObjectId,ref:"comment"},
show:{type:Boolean,required:true, default:false},
OpenToComment:{type:Boolean,default:false}
},{
    timestamps:{createdAt:true}
})
const commentschema=new mongoose.Schema({
user:{type:mongoose.Types.ObjectId,ref:"user",required:true},
comment:{type:String,required:true},
parent:{type:mongoose.Types.ObjectId,ref:"comment"},
show:{type:Boolean,required:true, default:false},
OpenToComment:{type:Boolean,default:true},
answer:{type:[AnswerSchema],default:[]}
},{
    timestamps:{createdAt:true}
})
module.exports={
    commentschema
}