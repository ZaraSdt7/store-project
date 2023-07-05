const createerror = require("http-errors");
const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEYS } = require("../../utils/constans");
const { UserModel } = require("../models/users");
function GetToken(headers) {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer)) return token;
  throw createerror.Unauthorized(
    "حساب کاربری شناسایی نشدوارد حساب کاربری خود شوید.."
  );
}
function VerifyAccessToken(req, res, next) {
  try {
    const token=GetToken(req.headers);
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEYS, async (err, payload) => {
      try {
      if (err)
      return next(createerror.Unauthorized("وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) return next(createerror.Unauthorized("کاربری یافت نشد"));
      req.user = user;
      await user.save();
      return next();  
      } catch (error) {
        next(error)
      }
      
    });
  } catch (error) {
    next(error)
  }
}
async function GraphAccessToken(req){
try{
const token = GetToken(req.headers)
const {mobile} = JWT.verify(token,ACCESS_TOKEN_SECRET_KEYS);
const user = await UserModel.find({mobile},{password:0},{otp:0});
if(!user) throw createerror.Unauthorized("حساب کاربری یافت نشد");
return user  
}catch(error){
throw new createerror.Unauthorized()  
}  
}
module.exports = {
  VerifyAccessToken,
  GraphAccessToken
};
