const {default:mongoose, Mongoose}=require("mongoose");
const { commentschema } = require("./public.schema");
const Episodes=new mongoose.Schema({
title:{type:String,required:true},
text:{type:String,required:true},
type:{type:String,default:"free"},
time:{type:String,required:true}    
})
const Chapters=new mongoose.Schema({
title:{type:String,required:true},
text:{type:String,required:true,default:""},  
episod:{type:[Episodes],default:[]}  
})
const Schema=new mongoose.Schema({
title:{type:String,required:true},
short_text:{type:String,required:true},
text:{type:String,required:true},
image:{type:String,required:true},
tag:{type:[String],required:true},
category:{type:mongoose.Types.ObjectId,ref:"category",required:true},
comments:{type:[commentschema],default:[]},
like:{type:[mongoose.Types.ObjectId],default:[]},
deslike:{type:[Mongoose.Types.ObjectId],default:[]},
bookmark:{type:[mongoose.Types.ObjectId],default:[]},
price:{type:Number,default:0},
discount:{type:Number,default:0},
type:{type:String,required:true,default:"free"}, //virtual,phisycal
time:{type:String,default:"00:00:00"},
teacher:{type:mongoose.Types.ObjectId,ref:"user",required:true},
chapter:{type:[Chapters],default:[]},
students:{type:[mongoose.Types.ObjectId],default:[],ref:"user"}

})
module.exports={
   CoursetModel:mongoose.model("course",Schema)
}