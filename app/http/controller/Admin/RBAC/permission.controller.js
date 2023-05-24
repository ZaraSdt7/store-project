const httpStatus = require("http-status");
const { PermissionModel } = require("../../../models/permission");
const Controller = require("../../controller");
const { PermissionSchema } = require("../../../validations/admin/RBAC.schema");
const createHttpError = require("http-errors");
const { CopyObject, DeleteInvitedPropertyObject } = require("../../../../utils/function");

class PermissionController extends Controller{
async GetAllPermissions(req,res,next){
try {
const getpermission = await PermissionModel.find({});
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
  getpermission
}  
})    
} catch (error) {
  next(error)  
}
}
async CreatePermissions(req,res,next){
try {
const {name,description}=await PermissionSchema.validateAsync(req.body);
await this.FindPermissionByName(name);
const Createpermissions = await PermissionModel.create({name,description});
if(!Createpermissions) throw new createHttpError.InternalServerError("ایجاد سطح دسترسی انجام نشد");
return res.status(httpStatus.CREATED).json({
statusCode:httpStatus.CREATED,
data:{
  message:"ایجاد سطح دسترسی با موفقیت انجام شد"
}  
})
} catch (error) {
  next(error)
}  
}
async UpdatePermissionByID(req,res,next){
try {
const {id}= req.params;
await this.FindPermissionByID(id);
const data = CopyObject(req.body);
DeleteInvitedPropertyObject(data,[]);
const UpdatePer= await PermissionModel.updateOne({_id:id},{$set:data});
if(!UpdatePer.modifiedCount) throw new createHttpError.InternalServerError("بروزرسانی سطح دسترسی انجام نشد");
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
message:"بروزرسانی با موفقیت انجام شد"  
}  
})
} catch (error) {
  next(error)
}  
}
async RemovePermission(req,res,next){
const {id}= req.params;
await this.FindPermissionByID(id);
const removeper= await PermissionModel.deleteOne({_id:id});
if(!removeper.deletedCount) throw new createHttpError.InternalServerError("سطح دسترسی حذف نشد");
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
message:"سطح دسترسی با موفقیت حذف شد"  
}  
})   
}
async FindPermissionByName(name){
const findname = await PermissionModel.findOne({name});
if(findname) throw new createHttpError.BadRequest("نام دسترسی قبلا ثبت شده");  
}
async FindPermissionByID(_id){
const findper = await PermissionModel.findOne({_id});
if(!findper) throw new createHttpError.NotFound("شناسه دسترسی یافت نشد ")
return findper;  
}
}
module.exports={
    PermissionController: new PermissionController()
}