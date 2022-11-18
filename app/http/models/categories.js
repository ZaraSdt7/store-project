const {default:mongoose}=require("mongoose");
const Schema=new mongoose.Schema({
title:{type:String,required:true},
parents:{type:mongoose.Types.ObjectId,default:undefined}
})
module.exports={
    CategoryModel:mongoose.model("category",Schema)
}