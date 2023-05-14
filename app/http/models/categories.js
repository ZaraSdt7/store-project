const { path } = require("@hapi/joi/lib/errors");
const {default:mongoose}=require("mongoose");
const CategorySchema=new mongoose.Schema({
title:{type:String,required:true},
parent:{type:mongoose.Types.ObjectId, ref : "category",default:undefined}
},
{
    id : false,
    toJSON : {
        virtuals: true
    }

});
CategorySchema.virtual("children", {
    ref : "category",
    localField : "_id",
    foreignField: "parent"
})
function outoPopulate(next){
this.populate([{path:"children",select:{__v:0,id:0}}])
next();    
}
CategorySchema.pre('findOne',outoPopulate).pre("find",outoPopulate)
CategorySchema.virtual("imageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`
})
module.exports={
    CategoryModel:mongoose.model("category",CategorySchema)
}