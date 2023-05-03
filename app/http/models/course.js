const {default:mongoose}=require("mongoose");
const { commentschema } = require("./public.schema");
const { process } = require("@hapi/joi/lib/errors");
const Episodes=new mongoose.Schema({
title:{type:String,required:true},
text:{type:String,required:true},
type:{type:String,default:"unlock"},
time:{type:String,required:true},
videoAddress:{type:String,required:true}  
},{toJSON:{virtuals:true}})
//return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`
//})

const Chapters=new mongoose.Schema({
title:{type:String,required:true},
text:{type:String,required:true,default:""},  
episod:{type:[Episodes],default:[]}  
})
const CourseSchema=new mongoose.Schema({
title:{type:String,required:true},
short_text:{type:String,required:true},
text:{type:String,required:true},
image:{type:String,required:true},
tags:{type:[String],default:[]},
category:{type:mongoose.Types.ObjectId,ref:"category",required:true},
comments:{type:[commentschema],default:[]},
likes:{type:[mongoose.Types.ObjectId],ref:"user",default:[]},
deslikes:{type:[mongoose.Types.ObjectId],ref:"user",default:[]},
bookmarks:{type:[mongoose.Types.ObjectId],ref:"user",default:[]},
price:{type:Number,default:0},
discount:{type:Number,default:0},
type: {type: String, default: "free"/*free, cash, special */, required : true},
status: {type: String, default: "notStarted" /*notStarted, Completed, Holding*/},
time:{type:String,default:"00:00:00"},
teacher:{type:mongoose.Types.ObjectId,ref:"user",required:true},
chapters:{type:[Chapters],default:[]},
students:{type:[mongoose.Types.ObjectId],default:[],ref:"user"}
}, 
{
   toJSON: {
       virtuals: true
   }
})
CourseSchema.index({title:"text",text:"text",short_text:"text"})
//CourseSchema.virtual("imageURL").get(function(){
   //return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
//})
//CourseSchema.virtual("totalTime").get(function(){
  // return getTimeOfCourse(this.chapters || [])
//})
module.exports={
   CoursetModel:mongoose.model("course",CourseSchema)
}