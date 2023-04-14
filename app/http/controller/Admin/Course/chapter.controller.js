const Controller = require("../../controller");

class ChapterController extends Controller{
async AddChapter(req,res,next){
try {
    
} catch (error) {
  next(error)  
}    
}
}
module.exports={
ChapterController: new ChapterController()    
}