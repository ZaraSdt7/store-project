const { json } = require("express");
const { CreateBlogSchema } = require("../../../validations/admin/blog.schema");
const path=require("path");
const createerror=require("http-errors");
const Controller = require("../../controller");
const { BlogModel } = require("../../../models/blog");
const { DeleteFileInPublic } = require("../../../../utils/function");
const { object } = require("@hapi/joi");
const httpStatus = require("http-status");
class BlogController extends Controller{
    async CreateBlog(req,res,next){
        try {
        const BlogDate= await CreateBlogSchema.validateAsync(req.body);
        req.body.image=path.join(BlogDate.fileUploadPath,BlogDate.filename);
        req.body.image=req.body.image.replace(/\\/g,"/");
        const {title,categories,text,tags,short_text}=BlogDate;
        const image=req.body.image;
        const author=req.user._id;
        const blogs=await BlogModel.create({title,text,short_text,categories,image,author,tags})
        return res.status(httpStatus.CREATED).json({
            statusCode:httpStatus.CREATED,
         data:{
            message:"ایجاد بلاگ با موفقیت ثبت شد",
            blogs
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
         $unwind:{ path: "$category", preserveNullAndEmptyArrays: true }
        },
        {
            $project : {
                "author.__v" :0,
                "category.__v" :0,
                "author.otp" : 0,
                "author.Roles" : 0,
                "author.discount" : 0,
                "author.bills" : 0,
            }
        }
     ])   
     return res.status(httpStatus.OK).json({
     data:{
        statusCode:httpStatus.OK,
        blog
     }
     })   

    } catch (error) {
        next(error)
    }
}

async GetOneById(req,res,next){
    try {
    const {id} =req.params;
    const blog=await this.FindBlogId(id);
    return res.status(httpStatus.OK).json({
        data:{
            blog
        }
    })
    } catch (error) {
       next(error) 
    }
}

async DeleteBlogByID(req,res,next){
    try {
     const {id} = req.params;
     await this.FindBlogId(id);
     const result=await BlogModel.deleteOne({_id:id});
     if(result.deletedCount == 0) throw createerror.InternalServerError("حذف انجام نشد");
     return res.status(httpStatus.OK).json({
         statusCode:httpStatus.OK,
        data:{
            message:"حذف ب موفقیت انجام شد"
        }
     })   
    } catch (error) {
        next(error)
    }
}

async UpdateBlogByID(req,res,next){
    try {
    const {id}=req.params;
    await this.FindBlogId(id);
    if(req?.body?.fileUploadPath && req?.body?.filename){
    req.body.image=path.join(req.body.fileUploadPath,req.body.filename);
    req.body.iamge=req.body.image.replace(/\\/g,"/");  
    } 
    const data=req.body;
    let nullishData=[""," ",0,"0",undefined,null];
    let BlackListFeild=["bookmark","deslike","like","comment","author"];
    Object.keys(data).forEach(key=>{{
    if(BlackListFeild.includes(key)) delete data[key]
    if(typeof data[key] == "string") data[key]=data[key].trim();
    if(Array.isArray(data[key]) && data[key].length >0 ) data[key]=data[key].map(item=>item.trim());
    if(nullishData.includes(key)) delete data[key]
    }
})   
    const resultUpdate= await BlogModel.updateOne({_id:id},{$set:data})
    if(resultUpdate.modifiedCount == 0) throw createerror.InternalServerError("بروز رسانی انجام نشد")   
    return res.status(httpStatus.OK).json({
        statusCode:httpStatus.OK,
        data:{
            message:"بروز رسانی انجام شد "
        }
    })
    } catch (error) {
        DeleteFileInPublic(req?.body?.image)
        next(error)
    }
}




async FindBlogId(id){
    const blog= await BlogModel.findById(id).populate([{path:"categories",select:['title']},{path:"author",select:['first_name','last_name','mobile','user_name']}]);
    if(!blog) throw createerror.NotFound("مقاله یافت نشد");
    delete blog.categories.childeren
    return blog
    
    }

}


module.exports={
    BlogController:new BlogController()
}