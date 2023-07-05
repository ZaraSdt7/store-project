const {default:mongoose, Mongoose}=require("mongoose");
const { commentschema } = require("./public.schema");
const productSchema=new mongoose.Schema({
title:{type:String,required:true},
short_text:{type:String,required:true},
text:{type:String,required:true},
images:{type:[String],required:true},
tags:{type:[String],default:[]},
category:{type:mongoose.Types.ObjectId,ref:"category",required:true},
comments:{type:[commentschema],default:[]},
like:{type:[mongoose.Types.ObjectId],ref:'user',default:[]},
deslike:{type:[mongoose.Types.ObjectId],ref:'user',default:[]},
bookmark:{type:[mongoose.Types.ObjectId],ref:'user',default:[]},
price:{type:Number,default:0},
discount:{type:Number,default:0},
count:{type:Number},
type:{type:String,required:true}, //virtual,phisycal
time:{type:String},
format:{type:String},
supplier:{type:mongoose.Types.ObjectId,ref:"user",required:true},
feture:{type:Object,default:{
    length:"",
    height:"",
    width:"",
    weight:"",
    color:[],
    model:[],
    madein:""
}},
},
{
    toJSON: {
        virtuals: true
    }
})
productSchema.index({title:"text",short_text:"text",text:"text"})
productSchema.virtual("imagesURL").get(function(){
    return this.images.map(image=>`${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${image}`) 
})
module.exports={
    ProductModel:mongoose.model("product",productSchema)
}