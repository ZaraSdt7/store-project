const { GraphQLString } = require("graphql");
const { ResponsesType } = require("../typeDefs/public.type");
const { GraphAccessToken } = require("../../http/middleware/VerifyAccessToken");
const { default: mongoose, model } = require("mongoose");
const createHttpError = require("http-errors");
const { CheckExistBlogID, CheckExistProductID, CheckExistCourseID } = require("../utils");
const { CopyObject } = require("../../utils/function");
const { BlogModel } = require("../../http/models/blog");
const httpStatus = require("http-status");
const { CoursetModel } = require("../../http/models/course");
const { ProductModel } = require("../../http/models/product");

const CommentBlogMutation = {
type: ResponsesType,
args:{
    comment:{type:GraphQLString},
    blogID:{type:GraphQLString},
    parent:{type:GraphQLString}
},
resolve: async(_,args,context)=>{
const { req} = context;
const user = await GraphAccessToken(req); //authentication user
const{ comment,blogID,parent} = args;
if(!mongoose.isValidObjectId(blogID)) throw createHttpError.BadGateway("شناسه بلاگ ارسال شده صحیح نمی باشد");
await CheckExistBlogID(blogID);
if(parent && mongoose.isValidObjectId(parent)){
const commentDocument = await GetComment(BlogModel,parent)
if(commentDocument && !commentDocument?.OpenToComment) throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
const answercomment = await BlogModel.updateOne({"comments._id":parent},{
    $push:{"comments.$answer":{comment,user:user._id,show:false,OpenToComment:false}}
});
if(!answercomment.modifiedCount){
 throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد")
}
return {
    statusCode:httpStatus.CREATED,
    data:{
        message:"پاسخ با موفقیت ثبت شد"
    }
}
}else{
    await BlogModel.updateOne({_id:blogID},{
        $push:{comments:{comment,user:user._id,show:false,OpenToComment:true}}
    })
}
return{
    statusCode: httpStatus.CREATED,
    data:{
        message:"ثبت نظر با موفقیت انجام شد و پس ااز تایید در سایت قرار میگیرد"
    }
}
}
}
const CommentCourseMutation = {
    type: ResponsesType,
    args:{
        comment:{type:GraphQLString},
        courseID:{type:GraphQLString},
        parent:{type:GraphQLString}
    },
    resolve: async(_,args,context)=>{
    const { req} = context;
    const user = await GraphAccessToken(req); //authentication user
    const{ comment, courseID,parent} = args;
    if(!mongoose.isValidObjectId( courseID)) throw createHttpError.BadGateway("شناسه دوره ارسال شده صحیح نمی باشد");
    await CheckExistCourseID( courseID);
    if(parent && mongoose.isValidObjectId(parent)){
    const commentDocument = await GetComment(CoursetModel,parent)
    if(commentDocument && !commentDocument?.OpenToComment) throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
    const answercomment = await CoursetModel.updateOne({_id:courseID,"comments._id":parent},{
        $push:{"comments.$answer":{comment,user:user._id,show:false,OpenToComment:false}}
    });
    if(!answercomment.modifiedCount){
     throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد")
    }
    return {
        statusCode:httpStatus.CREATED,
        data:{
            message:"پاسخ با موفقیت ثبت شد"
        }
    }
    }else{
        await CoursetModel.updateOne({_id:courseID},{
            $push:{comments:{comment,user:user._id,show:false,OpenToComment:true}}
        })
    }
    return{
        statusCode: httpStatus.CREATED,
        data:{
            message:"ثبت نظر با موفقیت انجام شد و پس ااز تایید در سایت قرار میگیرد"
        }
    }
    }
    }
const CommentProductMutation = {
        type: ResponsesType,
        args:{
            comment:{type:GraphQLString},
           productID:{type:GraphQLString},
            parent:{type:GraphQLString}
        },
        resolve: async(_,args,context)=>{
        const { req} = context;
        const user = await GraphAccessToken(req); //authentication user
        const{ comment, productID,parent} = args;
        if(!mongoose.isValidObjectId( productID)) throw createHttpError.BadGateway("شناسه محصول ارسال شده صحیح نمی باشد");
        await CheckExistProductID( productID);
        if(parent && mongoose.isValidObjectId(parent)){
        const commentDocument = await GetComment(ProductModel,parent)
        if(commentDocument && !commentDocument?.OpenToComment) throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
        const answercomment = await ProductModel.updateOne({_id:productID,"comments._id":parent},{
            $push:{"comments.$answer":{comment,user:user._id,show:false,OpenToComment:false}}
        });
        if(!answercomment.modifiedCount){
         throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد")
        }
        return {
            statusCode:httpStatus.CREATED,
            data:{
                message:"پاسخ با موفقیت ثبت شد"
            }
        }
        }else{
            await ProductModel.updateOne({_id:productID},{
                $push:{comments:{comment,user:user._id,show:false,OpenToComment:true}}
            })
        }
        return{
            statusCode: httpStatus.CREATED,
            data:{
                message:"ثبت نظر با موفقیت انجام شد و پس ااز تایید در سایت قرار میگیرد"
            }
        }
        }
        }
async function GetComment(model,id){
const findcomment = await model.findOne({"comments._id":id},{"comments.$":1});
const comment = CopyObject(findcomment);
if(!comment?.comments?.[0]) throw createHttpError.NotFound("کامنتی با این مشخصات یافت نشد");
return comment?.comments?.[0] ;  
}
module.exports={
    CommentBlogMutation,
    CommentCourseMutation,
    CommentProductMutation
}