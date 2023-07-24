const { GraphQLList } = require("graphql");
const { BlogType } = require("../typeDefs/blog.type");
const { GraphAccessToken } = require("../../http/middleware/VerifyAccessToken");
const { BlogModel } = require("../../http/models/blog");
const { CoursetModel } = require("../../http/models/course");
const { CourseType } = require("../typeDefs/course.type");
const { ProductModel } = require("../../http/models/product");
const { ProductType } = require("../typeDefs/product.type");
const { AnyType } = require("../typeDefs/public.type");
const { UserModel } = require("../../http/models/users");
const { ObjectId } = require("mongodb");
const { CopyObject } = require("../../utils/function");
//const { GetBascketOfUser } = require("../../utils/function");



const GetUserBookmarkBlogs = {
type:new GraphQLList(BlogType),
resolve :async(_,args,context)=>{
const {req} = context;
const user = await GraphAccessToken(req);
const blogs = await BlogModel.find({bookmark:user}).populate([{path:'author'},{path:"categories"},{path:"comments.user"},{path:"comments.answer.user"},{path:"like"},{path:"deslike"},{path:"bookmark"}]);
return blogs
}
}

const GetUserBookmarkCourse = {
    type:new GraphQLList(CourseType),
    resolve :async(_,args,context)=>{
    const {req} = context;
    const user = await GraphAccessToken(req);
    const courses = await CoursetModel.find({bookmark:user}).populate([{path:'teacher'},{path:"category"},{path:"comments.user"},{path:"comments.answer.user"},{path:"like"},{path:"deslike"},{path:"bookmark"}]);
    return courses
    }
    }

    const GetUserBookmarkProduct = {
        type:new GraphQLList(ProductType),
        resolve :async(_,args,context)=>{
        const {req} = context;
        const user = await GraphAccessToken(req);
        const products = await ProductModel.find({bookmark:user}).populate([{path:'supplier'},{path:"category"},{path:"comments.user"},{path:"comments.answer.user"},{path:"like"},{path:"deslike"},{path:"bookmark"}]);
        return products
        }
        }
    const GetBascketUser = {
    type : AnyType,
    resolve:async(_,args,context)=>{
     const {req} = context;
     const user = await GraphAccessToken(req);
     const userdetail =await UserModel.aggregate([
        {
          $match :{_id:ObjectId("63bf11382a1601a250314b7b")} //when user login and get userID
        },
        {
          $project :{bascket:1} // info bascket
        },
        {
          $lookup:{
            from : "products", //collection product
            localField: "bascket.products.productID",
            foreignField: "_id",
            as: "productDetail"
          }
        },
        {
          $lookup:{
           from: "courses",
           localField: "bascket.courses.courseID",
           foreignField: "_id",
           as: "courseDetail"
          }
        },
        {
          $addFields:{
            "productDetail":{
              $function:{
                body:function(productDetail,products){
                  return productDetail.map(function(product){
                    const count = products.find(item=>item.productID.valueOf() == product._id.valueOf()).count;
                    const totalprice = count * product.price;
                    return{
                      _id:product._id,
                      price:product.price,
                      discout:product.discount,
                      totalprice,
                      finalprice:totalprice - ((product.discount/100)*totalprice)
                    }
                  })
                },
                args:["$productDetail","$bascket.products"],
                lang:"js"
              }
            },
            "courseDetail":{
              $function:{
                body:function(courseDetail){
                  return courseDetail.map(function(course){
                    return{
                      _id: course._id,
                      title: course.title,
                      price: course.price,
                      discount: course.discount,
                      finalprice:course.price - ((course.discount/100)*course.price)
                    }
                  })
                },
                args:["$courseDetail","$bascket.courses"],
                lang:"js"
              }
            },
            
          }
        }  
        ]);
      
        return CopyObject(userdetail)  
     },
     
    }
    module.exports={
        GetUserBookmarkBlogs,
        GetUserBookmarkCourse,
        GetUserBookmarkProduct,
        GetBascketUser
    }