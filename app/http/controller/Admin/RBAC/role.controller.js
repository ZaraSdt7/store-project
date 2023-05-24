const httpStatus = require("http-status");
const { RoleModel } = require("../../../models/role");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { RoleSchema } = require("../../../validations/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");

class RoleController extends Controller{
async GetAllRoles(req,res,next){
try {
const GetRole = await RoleModel.find({});
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
    GetRole
}    
})    
} catch (error) {
  next(error)  
}    
}
async CreateRole(req,res,next){
try {
const{title,permissions} = await RoleSchema.validateAsync(req.body);
await this.FindRoleWithTitle(title);
const create = await RoleModel.create({title,permissions});
if(!create) throw createHttpError.InternalServerError("رول ایجاد نشد");
return res.status(httpStatus.CREATED).json({
    statusCode:httpStatus.CREATED,
    data:{
    message:"رول با موفقیت ایجاد شد"
    }
})    
} catch (error) {
  next(error)  
}    
}
async RemoveRole(req,res,next){
try {
const {field} = req.params;
const role = await this.FindRoleByIDorTitle(field);
const remove = await RoleModel.deleteOne({_id:role._id});
if(!remove.deletedCount) throw new createHttpError.InternalServerError("رول مورد نظر حذف نشد");
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
message:"حذف رول با موفقیت انجام شد"  
}  
})
} catch (error) {
  next(error)
}  
}
async FindRoleByIDorTitle(field){
let FindQuery = mongoose.isValidObjectId(field)? {_id:field}:{title:field};
const role = await RoleModel.findOne(FindQuery);
if(!role) throw new createHttpError.NotFound("رول یافت نشد");
return role;
}
async FindRoleWithTitle(title){
const role = await RoleModel.findOne({title});
if(role) throw createHttpError.BadRequest("رول قبلا ثبت شده است")    
}
}
module.exports={
    RoleController: new RoleController()
}