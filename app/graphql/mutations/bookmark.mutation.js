const { GraphQLString } = require("graphql");
const { ResponsesType } = require("../typeDefs/public.type");
const { GraphAccessToken } = require("../../http/middleware/VerifyAccessToken");
const { BlogModel } = require("../../http/models/blog");
const { ProductModel } = require("../../http/models/product");
const { CoursetModel } = require("../../http/models/course");
const httpStatus = require("http-status");
const { CheckExistBlogID, CheckExistProductID, CheckExistCourseID } = require("../utils");

const BlogBookmark = {
type: ResponsesType,
args:{
    blogID : {type:GraphQLString}
},
resolve : async(_,args,context)=>{
const {req} = context;
const user = await GraphAccessToken(req);
const {blogID} = args;
await CheckExistBlogID(blogID)
let bookmarkblog = await BlogModel.findOne({_id:blogID},{bookmark:user});
const findQuery = bookmarkblog?{$pull:{bookmark:user}} : {$push:{bookmark:user}};
await BlogModel.updateOne({_id:blogID},findQuery);
let message;
if(!bookmarkblog){
   message= "بلاگ به لیست علاقه مندی ها اضافه شد" 
} else message= "بلاگ از لیست علاقه مندی ها حذف شد"
return{
    statusCode:httpStatus.OK,
   data:{
    message
   }
}
}    
}

const ProductBookmark = {
    type: ResponsesType,
    args:{
        productID : {type:GraphQLString}
    },
    resolve : async(_,args,context)=>{
    const {req} = context;
    const user = await GraphAccessToken(req);
    console.log(user)
    const {productID} = args;
    await CheckExistProductID(productID)
    let bookmarkproduct = await ProductModel.findOne({_id:productID,bookmark:user});
    const findQuery = bookmarkproduct?{$pull:{bookmark:user._id}} : {$push:{bookmark:user}};
    await ProductModel.updateOne({_id:productID},findQuery);
    let message;
    if(!bookmarkproduct){
       message= "محصول به لیست علاقه مندی ها اضافه شد" 
    } else message= "محصول از لیست علاقه مندی ها حذف شد"
    return{
        statusCode:httpStatus.CREATED,
       data:{
        message
       }
    }
    }    
    }

    const CourseBookmark = {
        type: ResponsesType,
        args:{
           courseID : {type:GraphQLString}
        },
        resolve : async(_,args,context)=>{
        const {req} = context;
        const user = await GraphAccessToken(req);
        const {courseID} = args;
        await CheckExistCourseID(courseID)
        let bookmarkcourse = await CoursetModel.findOne({_id:courseID},{bookmark:user});
        const findQuery = bookmarkcourse?{$pull:{bookmark:user}} : {$push:{bookmark:user}};
        await CoursetModel.updateOne({_id:courseID},findQuery);
        let message;
        if(!bookmarkproduct){
           message= "دوره به لیست علاقه مندی ها اضافه شد" 
        } else message= "دوره از لیست علاقه مندی ها حذف شد"
        return{
            statusCode:httpStatus.OK,
           data:{
            message
           }
        }
        }    
        }    

        module.exports={
            CourseBookmark,
            BlogBookmark,
            ProductBookmark
        }