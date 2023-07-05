const { GraphQLString } = require("graphql");
const { ResponsesType } = require("../typeDefs/public.type");
const { GraphAccessToken } = require("../../http/middleware/VerifyAccessToken");
const { CheckExistProductID, CheckExistBlogID, CheckExistCourseID } = require("../utils");
const { ProductModel } = require("../../http/models/product");
const httpStatus = require("http-status");
const { BlogModel } = require("../../http/models/blog");
const { CoursetModel } = require("../../http/models/course");

const LikesProduct = {
    type:ResponsesType,
    args:{
        productID:{type:GraphQLString}
    },
    resolve: async(_,args,context)=>{
     const {req} = context;
     const user = await GraphAccessToken(req);
     const {productID} = args;
     await CheckExistProductID(productID);
     let likeproduct= await ProductModel.findOne({_id:productID,like:user});
     let deslikeproduct= await ProductModel.findOne({_id:productID,deslike:user});
     const updateQuery = likeproduct?{$pull:{like:user}} : {$push:{like:user}}
     await ProductModel.updateOne({_id:productID},updateQuery);
     let message 
     if(!likeproduct){
         if(deslikeproduct) await ProductModel.updateOne({_id:productID},{$pull:{deslike:user}})
        message="محصول لایک شد"
    }else message="محصول دیسلایک شد"
    return {
        statusCode:httpStatus.CREATED,
        data:{
            message
        }
    }
    }
}

const LikesCourse = {
    type:ResponsesType,
    args:{
       courseID:{type:GraphQLString}
    },
    resolve: async(_,args,context)=>{
     const {req} = context;
     const user = await GraphAccessToken(req);
     const {courseID} = args;
     await CheckExistCourseID(courseID);
     let likecourse= await CoursetModel.findOne({_id:courseID,like:user});
     let deslikecourse= await CoursetModel.findOne({_id:courseID,deslike:user});
     const updateQuery = likecourse?{$pull:{like:user}} : {$push:{like:user}}
     await CoursetModel.updateOne({_id:courseID},updateQuery);
    
     let message 
     if(!likecourse){
         if(deslikecourse) await CoursetModel.updateOne({_id:courseID},{$pull:{deslike:user}})
        message="دوره لایک شد"
    }else message="دوره دیسلایک شد"
    return {
        statusCode:httpStatus.CREATED,
        data:{
            message
        }
    }
    }
}

const LikesBlogs = {
    type:ResponsesType,
    args:{
        blogID:{type:GraphQLString}
    },
    resolve: async(_,args,context)=>{
     const {req} = context;
     const user = await GraphAccessToken(req);
     const {blogID} = args;
     await CheckExistBlogID(blogID);
     let likeblog= await BlogModel.findOne({_id:blogID,like:user});
     let deslikeblog= await BlogModel.findOne({_id:blogID,deslike:user});
     const updateQuery = likeblog?{$pull:{like:user}} : {$push:{like:user}}
     await BlogModel.updateOne({_id:blogID},updateQuery);
     let message 
     if(!likeblog){
         if(deslikeblog) await BlogModel.updateOne({_id:blogID},{$pull:{deslike:user}})
        message="بلاگ لایک شد"
    }else message="بلاگ دیسلایک شد"
    return {
        statusCode:httpStatus.CREATED,
        data:{
            message
        }
    }
    }
}
module.exports={
    LikesProduct,
    LikesBlogs,
    LikesCourse
}