const httpStatus = require("http-status");
const { UserModel } = require("../../../models/users");
const Controller = require("../../controller");
const { DeleteInvitedPropertyObject } = require("../../../../utils/function");
const createHttpError = require("http-errors");

class UserController extends Controller{
async GetAllUsers(req,res,next){
try {
const {search} = req.params;
let dataquery={};
if(search) dataquery["$text"] = {$search:search}
const users = await UserModel.find(dataquery);
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
    users
}    
})    
} catch (error) {
  next(error)  
}    
}
async UpdateUser(req,res,next){
try {
const {userID} = req.user._id;
const data = req.body;
const BlackListField = ["otp","moile","bills","discount","birthday","Roles","course"];
DeleteInvitedPropertyObject(data,BlackListField);
const updateuser = await UserModel.updateOne({_id:userID},{
  $set:data
})  
if(!updateuser.modifiedCount) throw new createHttpError.InternalServerError("بروز رسانی انجام نشد");
return res.status(httpStatus.OK).json({
  statusCode:httpStatus.OK,
  data:{
    message: " بروز رسانی با موفقیت انجام شد"
  }
})
} catch (error) {
  next(error)
}
}
}
module.exports = {
    UserController : new UserController()
}