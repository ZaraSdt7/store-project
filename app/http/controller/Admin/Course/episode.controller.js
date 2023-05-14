const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { CreateEpisodeSchema } = require("../../../validations/admin/course.schema");
const Controller = require("../../controller");
const path =require("path");
const { GetTime, CopyObject, DeleteInvitedPropertyObject } = require("../../../../utils/function");
const { CoursetModel } = require("../../../models/course");
const createHttpError = require("http-errors");
const httpStatus = require("http-status");
const { objectIdvalidation } = require("../../../validations/public.validation");

class EpisodeController extends Controller{
async AddNewEpisode(req,res,next){
try {
const{title,text,type,courseID,chapterID,filename,fileUploadPath}=await CreateEpisodeSchema.validateAsync(req.body);
const videoAddress =path.join(fileUploadPath,filename).replace(/\\/g,"/");
const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
const second = await getVideoDurationInSeconds(videoURL)
const time = GetTime(second)
const Episode = {title,text,type,videoAddress,time}
const CreateEpisode = await CoursetModel.updateOne({_id:courseID,"chapters._id":chapterID},
{$push:
     {"chapters.$.episod":Episode}
})
if(CreateEpisode.modifiedCount == 0) throw createHttpError.InternalServerError("افزودن اپیزود انجام نشد");
return res.status(httpStatus.CREATED).json({
statusCode:httpStatus.CREATED,
data:{
    message: "افزودن اپیزود با موفقیت انجام شد"
}    
})    
} catch (error) {
    next(error)
}    
}
async RemoveEpisode(req,res,next){
try {
const { id:episodeID } = await objectIdvalidation.validateAsync({
     id:req.params.episodeID});
//await this.GetOneEpisode(episodeID)
const RemoveEpisode = await CoursetModel.updateOne({"chapters.episod._id":episodeID},{
    $pull:{"chapters.$episod":{_id:episodeID}}
}) 
if(RemoveEpisode.modifiedCount==0) throw createHttpError.InternalServerError("حذف اپیزود انجام نشد");
return res.status(httpStatus.OK).json({
    statusCode:httpStatus.OK,
    data:{
        message:"حذف اپیزود با موفقیت انجام شد"
    }
})   
} catch (error) {
  next(error)  
}    
}
async UpdateEpisode(req,res,next){
try {
const {episodeID} = req.params;
const episode = await this.GetOneEpisode(episodeID);
const {filename,fileUploadPath} = req.body;
let BlackListFeild = ["_id"];
if (filename && fileUploadPath){
    const fileAddress =path.join(fileUploadPath,filename);
    req.body.videoAddress =fileAddress.replace(/\\/g,"/");
    const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`;
    const second = await getVideoDurationInSeconds(videoURL)
    req.body.time = GetTime(second)
    BlackListFeild.push("filename")
    BlackListFeild.push("fileUploadPath");
}  
else{
    BlackListFeild.push("time")
    BlackListFeild.push("videoAddress");   
}
const data = req.body;
DeleteInvitedPropertyObject(data,BlackListFeild)
const newepisode= {
    ...episode,
    ...data
}
const update = await CoursetModel.updateOne({"chapters.episod._id":episodeID},
{
    $set:{
        "chapters.$.episod": newepisode
    }

})
if(!update.modifiedCount) throw createHttpError.InternalServerError("بروز رسانی انجاام نشد")
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
    message:" بروزرسانی با موفقیت نجام شد"
}    
})
} catch (error) {
  next(error)  
}
}
async GetOneEpisode(episodeID){
const course = await CoursetModel.findOne({"chapters.episod._id":episodeID},
 {"chapters.episod":1}) 
 if (!course) throw createHttpError.NotFound("اپیزودی یافت نشد") 
 const episode =course?.chapters?.[0]?.episod?.[0]
 if (!episode) throw createHttpError.NotFound("اپیزودی یافت نشد")
 return CopyObject(episode)  
}
}
module.exports={
    EpisodeController: new EpisodeController()
}