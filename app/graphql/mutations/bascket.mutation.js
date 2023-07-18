const { GraphQLString } = require("graphql");
const { ResponsesType } = require("../typeDefs/public.type");
const { GraphAccessToken } = require("../../http/middleware/VerifyAccessToken");
const { CheckExistProductID, CheckExistCourseID } = require("../utils");
const { UserModel } = require("../../http/models/users");
const { CopyObject } = require("../../utils/function");
const httpStatus = require("http-status");
const createHttpError = require("http-errors");


const AddProductBascket = {
type : ResponsesType ,
args : {
    productID : {type:GraphQLString}
},
resolve: async(_,args,context)=>{
const {req} = context;
const user = await GraphAccessToken(req);
const {productID} = args;
await CheckExistProductID(productID)
const product = await FindProductBascket(user,productID);
if(product){
await UserModel.updateOne({_id:user,"bascket.products.productID":productID},{
    $inc:{
        "bascket.products.$.count":1
    }
})
}else{
      await UserModel.updateOne({_id:user},
        {
            $push:{
                "bascket.products":{productID,count:1}  // fix bug:productID is obj we have to put {} 
            }
        })
}
return {
    statusCode:httpStatus.OK,
    data:{
        message:"محصول به سبد خرید اضافه شد"
    }
}
}    
}
const AddCourseBascket ={
type:ResponsesType,
args:{
    courseID:{type:GraphQLString}
},
resolve:async(_,args,context)=>{
const {req} = context;
const user = await GraphAccessToken(req);
const {courseID} = args;
await  CheckExistCourseID(courseID);
const course = await FindCourseBascket(user,courseID)
if(course){
throw createHttpError.BadRequest("این دوره قبلا اضافه شده")
}else{
await UserModel.updateOne({_id:user},{$push:{"bascket.courses":{courseID,count:1}}})   
}
return{
    statusCode:httpStatus.OK,
    data:{
        message:"دوره به لیست خرید اضافه شد"
    }
}
}
}
const RemoveProductBascket = {
type: ResponsesType,
args:{
    productID :{type:GraphQLString}
},
resolve:async(_,args,context)=>{
const {req} = context;
const user = await GraphAccessToken(req);
const {productID} = args;
await CheckExistProductID(productID);
const product = await FindProductBascket(user,productID);
let message;
if(!product) throw createHttpError.NotFound("محصول مورد نظر یافت نشد");
if(product.count>1){
await UserModel.updateOne({_id:user,"bascket.products.productID":productID},
{
   $inc:{
    "bascket.products.$.count":-1
   }

})
message = "یک عدد محصول از سبد خرید کم شد"
}else{
 await UserModel.updateOne({_id:user,"bascket.products.productID":productID},{
    $pull:{
        "bascket.products":{productID}
    }
 })
 message="محصول از سبدخرید حذف شد"
}
return{
    statusCode:httpStatus.OK,
    data:{
        message
    }
}
}    
}
const RemoveCourseBascket = {
    type: ResponsesType,
    args:{
        courseID :{type:GraphQLString}
    },
    resolve:async(_,args,context)=>{
    const {req} = context;
    const user = await GraphAccessToken(req);
    const {courseID} = args;
    await CheckExistCourseID(courseID);
    const course = await FindCourseBascket(user,courseID);
    let message;
    if(!course) throw createHttpError.NotFound("دوره مورد نظر یافت نشد");
    if(course.count>1){
    await UserModel.updateOne({_id:user,"bascket.courses.courseID":courseID},
    {
       $inc:{
        "bascket.courses.$.count":-1
       }
    
    })
    message = "یک عدد دوره از سبد خرید کم شد"
    }else{
     await UserModel.updateOne({_id:user,"bascket.courses.productID":courseID},{
        $pull:{
            "bascket.courses":{courseID}
        }
     })
     message="دوره از سبدخرید حذف شد"
    }
    return{
        statusCode:httpStatus.OK,
        data:{
            message
        }
    }
    }    
    }
async function FindProductBascket(userID,productID){
const Findresult = await UserModel.findOne({
    _id:userID,"bascket.products.productID":productID},{ "bascket.products.$":1})    
const Userdetail = CopyObject(Findresult);
return Userdetail?.bascket?.products?.[0]
}
async function FindCourseBascket(userID,courseID){
    const Findresult = await UserModel.findOne({
        _id:userID,"bascket.courses.courseID":courseID},{ "bascket.courses.$":1})    
    const Userdetail = CopyObject(Findresult);
    return Userdetail?.bascket?.courses?.[0]
    }
    module.exports ={
        AddProductBascket,
        AddCourseBascket,
        RemoveCourseBascket,
        RemoveProductBascket
    }