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
  message:"فصل با موفقیت ایجاد شد"
}
}) 
} catch (error) {
  next(error)  
}    
}
async ChapterOfCourse(req,res,next){
try {
const {courseID} = req.params;
const course = await this.GetChaptersOfCourse(courseID);
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
  course
}  
})
} catch (error) {
  next(error)
}  
}
async GetChaptersOfCourse(id){
const chapters = await CoursetModel.findOne({_id:id},{chapters:1 , title:1})
if (!chapters) throw createHttpError.NotFound("دوره ای یافت نشد");
return chapters;  
}
}
module.exports={
ChapterController: new ChapterController()    
}