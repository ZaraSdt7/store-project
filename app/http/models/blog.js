const {default:mongoose}=require("mongoose");
const commentschema=new mongoose.Schema({
user:{type:mongoose.Types.ObjectId,ref:"users",required:true},
comment:{type:String,required:true},
createdAt:{type:Date,default:new Date().now()},
parent:{type:mongoose.Types.ObjectId}
})
const Schema=new mongoose.Schema({
author:{type:mongoose.Types.ObjectId,required:true},
title:{type:String,required:true},
text:{type:String,required:true},
short_text:{type:String,required:true},
image:{type:String,required:true},
tags:{type:[String],default:[]},
categories:{type:[mongoose.Types.ObjectId],required:true},
comment:{type:[commentschema],required:[]},
like:{type:[mongoose.Types.ObjectId],ref:"users",default:[]},
deslike:{type:[mongoose.Types.ObjectId],ref:"users",default:[]},
bookmark:{type:[mongoose.Types.ObjectId],ref:"users",default:[]}
},{timestamps:true,versionKey:false})
module.exports={
    BlogModel:mongoose.model("blog",Schema)
}