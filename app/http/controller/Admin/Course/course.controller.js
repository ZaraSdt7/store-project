const HttpStatus = require("http-status");
const { CoursetModel } = require("../../../models/course");
const path = require("path");
const Controller = require("../../controller");
const { CreateCourseSchema } = require("../../../validations/admin/course.schema");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { CopyObject, DeleteInvitedPropertyObject, DeleteFileInPublic } = require("../../../../utils/function");
const httpStatus = require("http-status");

class CourseController extends Controller{
async AddCourse(req,res,next){
try {
await CreateCourseSchema.validateAsync(req.body);
const {fileUploadPath,filename}=req.body;
const image = path.join(fileUploadPath,filename).replace(/\\/g,"/");
let {title,text,short_text,tags,category,price=0,discount=0,type}=req.body;
let teacher = req.user._id;
if(Number(price)> 0 && type === "free") throw createHttpError.BadRequest("برای  دوره رایگان نمیتوان قیمت ثبت کرد")
const courses = await CoursetModel.create({
title,
text,
short_text,
tags,
category,
price,
type,
discount,
image,
status:"notStarted",
teacher  
})  
if(!courses?._id) throw createHttpError.InternalServerError("دوره ثبت نشد")
return res.status(HttpStatus.CREATED).json({
statusCode:HttpStatus.CREATED,
data:{
  message: "دوره با موفقیت ثبت شد"
}  
})
} catch (error) {
  next(error)
}  
}  

async GetListCourse(req,res,next){
try {
const {search}=req.query;
let courses;
if(search) courses = await CoursetModel.find({$text:{$search:search}}).
populate([{path:"category",select:{title:1}},{path:"teacher",
select:{first_name:1,last_name:1,mobile:1}}])
.sort({_id:-1})
else courses = await CoursetModel.find({}).
populate([{path:"category",select:{children:0,parent:0}},{path:"teacher",
select:{first_name:1,last_name:1,mobile:1}}]).sort({_id:-1}) 
return res.status(HttpStatus.OK).json({
statusCode:HttpStatus.OK,
data:{
courses
}  
}) 
} catch (error) {
  next(error)  
}    
}   
async UpdateCourseByID(req,res,next){
try {
const {id} = req.params;
const course = this.FindcourseByID(id);
const data = CopyObject(req.body);
const {fileUploadPath,filename} = req.body;
let BlackListFeild = ["comments","likes","deslikes","bookmarks","time","chapters","filename","fileUploadPath","students","episod"];
DeleteInvitedPropertyObject(data,BlackListFeild);
if (req.file){
  data.image = path.join(fileUploadPath,filename);
  DeleteFileInPublic((await course).image);
  }
const updatecourse = await CoursetModel.updateOne({_id:id},
  {$set:data
  })
  if(!updatecourse.modifiedCount) throw createHttpError.InternalServerError("بروز رسانی انجام نشد");
  return res.status(httpStatus.OK).json({
    statusCode:httpStatus.OK,
    data:{
      message:"بروزرسانی انجام شد"
    }
  })
} catch (error) {
  next(error)
}  
}

async GetCourseByID(req,res,next){
try {
const {id} = req.params;
const course = await CoursetModel.findById(id);
if(!course) throw createHttpError.NotFound("دوره یافت نشد");
return res.status(HttpStatus.OK).json({
statusCode:HttpStatus.OK,
course  
})  
} catch (error) {
  next(error)
}  
}
async FindcourseByID(id){
if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه یافت نشد")
const courses=await CoursetModel.findById(id);
if(!courses) throw createHttpError.NotFound("دوره ای یافت نشد");
return courses;  
}
}
module.exports={
CourseController:new CourseController()    
}