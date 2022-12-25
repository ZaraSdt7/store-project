const { json } = require("express");
const { CreateBlogSchema } = require("../../validations/admin/blog.schema");
const path=require("path");
const Controller = require("../controller");
const { BlogModel } = require("../../models/blog");
const { DeleteFileInPublic } = require("../../../utils/function");
class BlogController extends Controller{
    async CreateBlog(req,res,next){
        try {
        const BlogDate= await CreateBlogSchema.validateAsync(req.body);
        req.body.image=path.join(BlogDate.fileUploadPath,BlogDate.filename);
        const {title,categories,text,tags,short_text}=BlogDate;
        const image=req.body.image;
        const author=req.user._id;
        const blogs=await BlogModel.create({title,text,short_text,categories,image,author,tags})
        return res.status(201).json({
         data:{
            statusCode:201,
            message:"ایجاد بلاگ با موفقیت ثبت شد"
         }   
        })
        } catch (error) {
            DeleteFileInPublic(req.body.image),
            next(error)
        }
    }
async GetListOfBlog(req,res,next){
    try {
     const blog= await BlogModel.aggregate([
        {
            $match:{}
        },
        {
            $lookup:{
             
                from:"users",
                foreignField:"_id",
                localField:"author",
                as:"author"
            }
        },
        {
         $unwind:"$author"
        },
        {
            $lookup:{
             
                from:"categories",
                foreignField:"_id",
                localField:"category",
                as:"category"
            }
        },
        {
         $unwind:"$category"
        },
        {
            $project:{

            }
        }
     ])   
     return res.status(200).json({
     statusCode:201,
     data:{
        statusCode:201,
        blog
     }
     })   

    } catch (error) {
        next(error)
    }
  }

 
}



module.exports={
    BlogController:new BlogController()
}