
const { GraphAccessToken } = require("../../http/middleware/VerifyAccessToken");
const { ProductModel } = require("../../http/models/product");
const { CheckExistProductID, CheckExistCourseID, CheckExistBlogID } = require("../utils");
const { GraphQLString } = require("graphql");
const { ResponsesType } = require("../typeDefs/public.type");
const { CoursetModel } = require("../../http/models/course");
const { BlogModel } = require("../../http/models/blog");
const httpStatus = require("http-status");

const DeLikesProduct = {
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
     const updateQuery = deslikeproduct?{$pull:{deslike:user}} : {$push:{deslike:user}}
     await ProductModel.updateOne({_id:productID},updateQuery);
     let message 
     if(!deslikeproduct){
         if(likeproduct) await ProductModel.updateOne({_id:productID},{$pull:{like:user}})
        message="نپسندیدن محصول انجام شد"
    }else message="نپسندیدن محصول لغو شد" 
    return {
        statusCode:httpStatus.OK,
        data:{
            message
        }
    }
    }
}
const DesLikeCourse = {
    type:ResponsesType,
    args:{
        courseID:{type:GraphQLString}
    },
    resolve : async(_,args,context)=>{
        const {req} = context;
        const{courseID} = args;
        const user = await GraphAccessToken(req);
        await CheckExistCourseID(courseID);
        let likedcourse = await CoursetModel.findOne({_id:courseID,like:user});
        let deslikecourse = await CoursetModel.findOne({_id:courseID,deslike:user});
       const updateQuery = deslikecourse?{$pull:{deslike:user}} : {$push:{deslike:user}};
        await CoursetModel.updateOne({_id:courseID},updateQuery);
        let message;
        if(!deslikecourse){
        if(likedcourse) await CoursetModel.updateOne({_id:courseID},{$pull:{like:user}});
        message = "نپسندیدن دوره اانجام شد"    
        }else message = " نپسندیدن دوره لغو شد"
      return {
        statusCode:httpStatus.OK,
        data:{
            message
        }
      }
    }
}
const DesLikeBlog = {
    type:ResponsesType,
    args:{
       blogID:{type:GraphQLString}
    },
    resolve : async(_,args,context)=>{
        const {req} = context;
        const{blogID} = args;
        const user = await GraphAccessToken(req);
        await CheckExistBlogID(blogID);
        let likedblog = await BlogModel.findOne({_id:blogID,like:user});
        let deslikeblog = await BlogModel.findOne({_id:blogID,deslike:user});
       const updateQuery = deslikeblog?{$pull:{deslike:user}} : {$push:{deslike:user}};
        await BlogModel.updateOne({_id:blogID},updateQuery);
        let message;
        if(!deslikeblog){
        if(likedblog) await BlogModel.updateOne({_id:blogID},{$pull:{like:user}}); 
        message = "نپسندیدن بلاگ اانجام شد"    // deslike blog
        }else message = " نپسندیدن بلاگ لغو شد" // cancel deslike blog
      return {
        statusCode:httpStatus.OK,
        data:{
            message
        }
      }
    }
}

module.exports={
    DeLikesProduct,
    DesLikeCourse,
    DesLikeBlog
}