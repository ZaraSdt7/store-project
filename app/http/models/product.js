const {default:mongoose, Mongoose}=require("mongoose");
const { commentschema } = require("./public.schema");
const Schema=new mongoose.Schema({
title:{type:String,required:true},
short_text:{type:String,required:true},
text:{type:String,required:true},
image:{type:[String],required:true},
tags:{type:[String],required:true},
category:{type:mongoose.Types.ObjectId,ref:"category",required:true},
comments:{type:[commentschema],default:[]},
like:{type:[mongoose.Types.ObjectId],default:[]},
deslike:{type:[mongoose.Types.ObjectId],default:[]},
bookmark:{type:[mongoose.Types.ObjectId],default:[]},
price:{type:Number,default:0},
discount:{type:Number,default:0},
count:{type:Number},
type:{type:String,required:true}, //virtual,phisycal
time:{type:String},
format:{type:String},
supplier:{type:mongoose.Types.ObjectId,required:true},
feture:{type:mongoose.Types.ObjectId,default:{
    length:"",
    height:"",
    width:"",
    weight:"",
    color:[],
    model:[],
    madein:""
}}

})
module.exports={
    ProductModel:mongoose.model("product",Schema)
}