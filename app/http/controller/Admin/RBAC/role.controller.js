const httpStatus = require("http-status");
const { RoleModel } = require("../../../models/role");
const Controller = require("../../controller");
const createHttpError = require("http-errors");
const { RoleSchema } = require("../../../validations/admin/RBAC.schema");

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
async FindRoleWithTitle(title){
const role = await RoleModel.findOne({title});
if(role) throw createHttpError.BadRequest("رول قبلا ثبت شده است")    
}
}
module.exports={
    RoleController: new RoleController()
}