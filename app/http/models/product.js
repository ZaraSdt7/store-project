const {default:mongoose, Mongoose}=require("mongoose");
const Schema=new mongoose.Schema({
title:{type:String,required:true},
short_des:{type:String,required:true},
total_des:{type:String,required:true},
images:{type:[String],required:true},
tags:{type:[String],required:true},
category:{type:mongoose.Types.ObjectId,required:true},
comments:{type:[],default:[]},
like:{type:[mongoose.Types.ObjectId],default:[]},
deslike:{type:[Mongoose.Types.ObjectId],default:[]},
bookmark:{type:[mongoose.Types.ObjectId],default:[]},
price:{type:Number,default:0},
discount:{type:Number,default:0},
count:{type:Number},
type:{type:String,required:true},
time:{type:String},
format:{type:String},
teacher:{type:mongoose.Types.ObjectId,required:true},
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