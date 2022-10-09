const createerror=require("http-errors");
const { authSchema } = require("../../../validations/user/auth.Schema");
class UserAuthController{
async login(req,res,next){
try {
const result=await authSchema.validateAsync(req.body);
return res.status(200).send("ورود شما ب موفقیت انجام شد")    
} catch (error) {
next(createerror.BadRequest(error.message))    
}
}    
}
module.exports={
    UserAuthController:new UserAuthController()
}