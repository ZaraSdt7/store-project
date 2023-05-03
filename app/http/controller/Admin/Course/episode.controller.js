const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { CreateEpisodeSchema } = require("../../../validations/admin/course.schema");
const Controller = require("../../controller");
const path =require("path");
const { GetTime } = require("../../../../utils/function");
const { CoursetModel } = require("../../../models/course");
const createHttpError = require("http-errors");
const httpStatus = require("http-status");

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
if(CreateEpisode.matchedCount == 0) throw createHttpError.InternalServerError("افزودن اپیزود انجام نشد");
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
}
module.exports={
    EpisodeController: new EpisodeController()
}