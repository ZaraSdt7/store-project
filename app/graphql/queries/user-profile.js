const { GraphQLList } = require("graphql");
const { BlogType } = require("../typeDefs/blog.type");
const { GraphAccessToken } = require("../../http/middleware/VerifyAccessToken");
const { BlogModel } = require("../../http/models/blog");
const { CoursetModel } = require("../../http/models/course");
const { CourseType } = require("../typeDefs/course.type");
const { ProductModel } = require("../../http/models/product");
const { ProductType } = require("../typeDefs/product.type");

const GetUserBookmarkBlogs = {
type:new GraphQLList(BlogType),
resolve :async(_,args,context)=>{
const {req} = context;
const user = await GraphAccessToken(req);
const blogs = await BlogModel.findOne({bookmark:user}).populate([{path:'author'},{path:"categories"},{path:"comments.user"},{path:"comments.answer.user"},{path:"like"},{path:"deslike"},{path:"bookmark"}]);
return blogs
}
}

const GetUserBookmarkCourse = {
    type:new GraphQLList(CourseType),
    resolve :async(_,args,context)=>{
    const {req} = context;
    const user = await GraphAccessToken(req);
    const courses = await CoursetModel.findOne({bookmark:user}).populate([{path:'teacher'},{path:"category"},{path:"comments.user"},{path:"comments.answer.user"},{path:"like"},{path:"deslike"},{path:"bookmark"}]);
    return courses
    }
    }

    const GetUserBookmarkProduct = {
        type:new GraphQLList(ProductType),
        resolve :async(_,args,context)=>{
        const {req} = context;
        const user = await GraphAccessToken(req);
        const products = await ProductModel.findOne({bookmark:user}).populate([{path:'supplier'},{path:"category"},{path:"comments.user"},{path:"comments.answer.user"},{path:"like"},{path:"deslike"},{path:"bookmark"}]);
        return products
        }
        }
    module.exports={
        GetUserBookmarkBlogs,
        GetUserBookmarkCourse,
        GetUserBookmarkProduct
    }