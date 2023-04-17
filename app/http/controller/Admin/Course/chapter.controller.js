const createHttpError = require("http-errors");
const { CoursetModel } = require("../../../models/course");
const Controller = require("../../controller");
const { CourseController } = require("./course.controller");
const httpStatus = require("http-status");

class ChapterController extends Controller{
async AddChapter(req,res,next){
try {
const {title,text,id}=req.body;
await CourseController.FindcourseByID(id); 
const SaveChapter=await CoursetModel.updateOne({_id:id},{$push:{chapters:{title,text,episod:[]}}})  
if(SaveChapter.modifiedCount == 0) throw createHttpError.InternalServerError("فصل افزوده نشد")
return res.status(httpStatus.CREATED).json({
statusCode:httpStatus.CREATED,
data:{
  message:"فصل ب موفقیت ایجاد شد"
}
}) 
} catch (error) {
  next(error)  
}    
}
}
module.exports={
ChapterController: new ChapterController()    
}