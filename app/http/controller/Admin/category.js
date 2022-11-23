const { CategoryModel } = require("../../models/categories");
const { categorySchema } = require("../../validations/admin/category.schema");
const createerror = require("http-errors");
const Controller = require("../controller");

class CategoryController extends Controller {
  async AddCategory(req, res, next) {
    try {
      await categorySchema.validateAsync(req.body);
      const { title, parents } = req.body;
      const category = await CategoryModel.create({ title, parents });
      if (!category) throw createerror.InternalServerError("خطای داخلی");
      category.save();
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "دسته بندی با موفقیت ثبت شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

async getAllParents(req,res,next){
try {
const parent=await CategoryModel.find({parents:undefined},{__v:0});
return res.status(200).json({
 data:{
  statusCode:200,
  parent
 } 
})
} catch (error) {
  next(error)
}  
}

async getChildrenOfParents(req,res,next){
try {
const {parents}=req.params;
const children=await CategoryModel.find({parents},{__v:0});
return res.status(200).json({
  data:{
    statusCode:200,
    children
  }
})  
} catch (error) {
 next(error) 
}
}

async getAllCategory(req,res,next){
try {

const category=await CategoryModel.aggregate([
{
  $lookup:{
    from: "categories",
    localField: "_id",
    foreignField: "parents",
    as: "children"
  },
},
{
  $project: {
    __v:0
  }
}  
]) 
return res.status(200).json({
  data:{
    statusCode:200,
    category
  }
}) 

} catch (error) {
  next(error)
}

}

async RemoveCategory(req,res,next){
  try {
  const {id}=req.params;
  const category= await this.ExistCategory(id);
  const removeCategory= await CategoryModel.deleteOne({_id:category._id});
  if(removeCategory.deletedCount == 0) throw createerror.InternalServerError("حذف شناسه انجام نشد");
  return res.status(200).json({
    data:{
      statusCode:200,
      message:"حذف شناسه با موفقیت انجام شد"
    }
  })  
  } catch (error) {
   next(error) 
  }
}
async ExistCategory(id){
const category=await CategoryModel.findById(id);
if(!category) throw createerror.NotFound("شناسه یافت نشد");
return category; 
}






  
}

module.exports={
    CategoryController:new CategoryController()
}