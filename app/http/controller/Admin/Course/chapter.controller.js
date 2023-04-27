const createHttpError = require("http-errors");
const { CoursetModel } = require("../../../models/course");
const Controller = require("../../controller");
const { CourseController } = require("./course.controller");
const httpStatus = require("http-status");
const { DeleteInvitedPropertyObject } = require("../../../../utils/function");

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
async RemoveChapterByID(req,res,next){
try {
const {chapterID} = req.params;
const chapter = await this.GetOneChapter(chapterID);
const removechapter = await CoursetModel.updateOne({"chapters._id":id},{
  $pull : {
    chapters :{
      _id:chapterID
    }}
})
if (removechapter.modifiedCount == 0) throw new createHttpError.InternalServerError("حذف فصل انجام نشد");
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
  message: "حذف فصل با موفقیت انجام شد"
}
})
} catch (error) {
  next(error)
}  
}
async UpdateChapterByID(req,res,next){
try {
const {chapterID} = req.params;
await this.GetOneChapter(chapterID);
const data = req.body;
DeleteInvitedPropertyObject(data,["_id"]);
const UpdateResult = await CoursetModel.updateOne({"chapters._id":chapterID},
{$set: {"chapters.$":data}})
if (UpdateResult.modifiedCount == 0) throw new createHttpError.InternalServerError("بروز رسانی انجام");
return res.status(httpStatus.OK).json({
  statusCode:httpStatus.OK,
  data:{
    message: "بروز رسانی انجام شد"
  }
})  
} catch (error) {
  next(error)
}  
}
async GetOneChapter(id){
const chapter = await CoursetModel.findOne({"chapters._id":id},{"chapters.$":1});
if (!chapter) throw new createHttpError.NotFound("فصلی با این شناسه یافت نشد");
return chapter  
}
}
module.exports={
ChapterController: new ChapterController()    
}