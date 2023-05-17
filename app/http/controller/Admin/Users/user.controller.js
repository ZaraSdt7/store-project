const httpStatus = require("http-status");
const { UserModel } = require("../../../models/users");
const Controller = require("../../controller");

class UserController extends Controller{
async GetAllUsers(req,res,next){
try {
const {search} = req.params;
let dataquery={};
if(search) dataquery["$text"] = {$search:search}
console.log(search);
console.log(dataquery);
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

}
module.exports = {
    UserController : new UserController()
}