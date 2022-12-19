const { json } = require("express");
const { CreateBlogSchema } = require("../../validations/admin/blog.schema");
const Controller = require("../controller");
class BlogController extends Controller{

async GetListOfBlog(req,res,next){
    try {
     return res.status(200).json({
     statusCode:200,
     data:{
        blogs:[]
     }
     })   

    } catch (error) {
        next(error)
    }
  }

async CreateBlog(req,res,next){
    try {
    const BlogDate= await CreateBlogSchema.validateAsync(req.body);
    return res.json(BlogDate)
    } catch (error) {
        next(error)
    }
}


  
}



module.exports={
    BlogController:new BlogController()
}