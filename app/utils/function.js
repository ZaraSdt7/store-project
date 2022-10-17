const JWT=require("jsonwebtoken");
const createerror=require("http-errors");
const { UserModel } = require("../http/models/users");
const { SECRET_KEYS } = require("./constans");
const { token } = require("morgan");
function PhoneNumberGenerator(){
return Math.floor((Math.random()*90000) + 10000)
}
function SignAccessToken(userId){
    return new Promise(async(resolve, reject) => {
    const user=await UserModel.findById(userId);
    const payload={
        mobile:userId.mobile,
        userID:user._id
    }  
    const secret="";
    const options={
    expiresIn:"1h"
    }  
    JWT.sign(payload,SECRET_KEYS,options,(err,token)=>{
        if(err) reject(createerror.InternalServerError("خطای سرور"))
        resolve(token)
    })
    })
}
module.exports={
    PhoneNumberGenerator,
    SignAccessToken
}