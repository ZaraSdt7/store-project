const { CategoryModel } = require("../../models/categories");
const { categorySchema, UpdateCategorySchema } = require("../../validations/admin/category.schema");
const createerror = require("http-errors");
const mongoose=require("mongoose");
const Controller = require("../controller");

class CategoryController extends Controller {
  async AddCategory(req, res, next) {
    try {
      await categorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category) throw createerror.InternalServerError("خطای داخلی");
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
const parent=await CategoryModel.find({parent:undefined});
return res.status(200).json({
 data:{
  parent
 } 
})
} catch (error) {
  next(error)
}  
}

async getChildrenOfParents(req,res,next){
try {
const {parent}=req.params;
const children=await CategoryModel.find({parent:new mongoose.Types.ObjectId(parent)})
return res.status(200).json({
  data:{
  children
  }
})  
} catch (error) {
 next(error) 
}
}

async getAllCategory(req,res,next){
try {

//const category=await CategoryModel.aggregate([
// {
//   $lookup:{
//     from: "categories",
//     localField: "_id",
//     foreignField: "parents",
//     as: "children"
//   },
// },
// {
//   $project: {
//     __v:0
//   }
// }
//])

// const categories=await CategoryModel.aggregate([
//   {
//     $graphLookup:{
//       from: "categories",
//       startWith:"$_id",
//       connectFromField:"_id",
//       connectToField:"parent",
//       maxDepth:5,
//       depthField:"depth",
//       as: "children"
//     },
//   },
//   {
//     $project: {
//       __v:0
//     }
//   },
//   {
//    $match:{
//     parent:undefined
//    }
//   }
//   ]) 
const categories=await CategoryModel.find({parent:undefined});
return res.status(200).json({
  data:{
    statusCode:200,
    categories
  }
}) 

} catch (error) {
  next(error)
}

}
async getAllCategoryWithoutPopulate(req,res,next){
  try {
  const category=await CategoryModel.aggregate([
    {
      $match: {}
    }
  ]);
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

async UpdateCategories(req,res,next){
  try {
  const {id}=req.params;
  const {title}=req.body;
  await UpdateCategorySchema.validateAsync(req.body);
  const categoryID=await this.ExistCategory(id);
  const updateresult=await CategoryModel.updateOne({_id:id},{$set:{title}});
  if(updateresult.modifiedCount == 0) throw createerror.InternalServerError("بروز رسانی انجام نشد");
  return res.status(200).json({
    data:{
      statusCode:200,
      message:"بروز رسانی انجام شد"
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
  const removeCategory= await CategoryModel.deleteMany({$or:[
    {_id:category._id},
    {parent:category._id}
  ]});
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

async getCategoryById(req,res,next){
try {
const {id:_id}=req.params;
const category=await CategoryModel.aggregate([
  {
    $match:{

      _id:mongoose.Types.ObjectId(_id)
    }
  },
  {
    $lookup:{
      from:"categories",
      localField:"_id",
      foreignField:"parent",
      as:"children"
    }
  },
  {
    $project:{
      __v:0
    }
  }
])
return res.status(200).json({
  data:{
    category
  }
})
  
} catch (error) {
 next(error) 
}
}



  
}

module.exports={
    CategoryController:new CategoryController()
}