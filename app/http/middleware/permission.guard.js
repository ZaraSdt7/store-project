const createHttpError = require("http-errors");
const { PERMISSIONS } = require("../../utils/constans");
const { PermissionModel } = require("../models/permission");
const { RoleModel } = require("../models/role");

function CheckPermissions(requiredpermissions=[]){
return async function(req,res,next){
try {
const allpermission = requiredpermissions.flat(2);
const user = req.user;
console.log(user)
const role = await RoleModel.findOne({title:user.Role});
console.log(user.Role)
const permissions = await PermissionModel.find({id:{$in:role.permissions}})
const userpermission= permissions.map(item=>item.name);
const haspermission = allpermission.every(permission=>{
    return userpermission.includes(permission)
})  
if(userpermission.includes(PERMISSIONS.ALL))
return next();
if(allpermission.length == 0 || haspermission)
return next(); throw new createHttpError.Forbidden("شما به این قسمت دسترسی ندارید")  
} catch (error) {
  next(error)

   
}    
}    
}
module.exports={
CheckPermissions    
}