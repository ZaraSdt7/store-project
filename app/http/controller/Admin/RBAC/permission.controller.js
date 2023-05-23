const httpStatus = require("http-status");
const { PermissionModel } = require("../../../models/permission");
const Controller = require("../../controller");
const { PermissionSchema } = require("../../../validations/admin/RBAC.schema");
const createHttpError = require("http-errors");

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
async FindPermissionByName(name){
const findname = await PermissionModel.findOne({name});
if(findname) throw new createHttpError.BadRequest("نام دسترسی قبلا ثبت شده");  
}
}
module.exports={
    PermissionController: new PermissionController()
}