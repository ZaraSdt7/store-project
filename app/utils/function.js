const JWT = require("jsonwebtoken");
const createerror = require("http-errors");
const { UserModel } = require("../http/models/users");
const { ACCESS_TOKEN_SECRET_KEYS, ACCESS_REFRESH_TOKEN_KEY } = require("./constans");
const RedisClient = require("./init_redis");

//const { token } = require("morgan");
function PhoneNumberGenerator() {
  return Math.floor(Math.random() * 90000 + 10000);
}
function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1h",
    };
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEYS, options, (err, token) => {
      if (err) reject(createerror.InternalServerError("خطای سرور"));
      resolve(token);
    });
  });
}
function SignAccessRefrshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile
    };
    const options = {
      expiresIn: "1y"
    };
    JWT.sign(payload, ACCESS_REFRESH_TOKEN_KEY, options,async(err, token) => {
      if (err) reject(createerror.InternalServerError("خطای سرور"));
      await RedisClient.SETEX(userId,(365*24*60*60),token);
      resolve(token);
    });
  });
}
function VerifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, ACCESS_REFRESH_TOKEN_KEY, async (err, payload) => {
      if (err) reject(createerror.Unauthorized("وارد حساب کاربری خودشوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createerror.Unauthorized("حساب کاربری یافت نشد"));
      const refreshToken=await RedisClient.get(user._id);
      if(token === refreshToken) return resolve(mobile);
      reject (createerror.Unauthorized("ورود به حساب کاربری انجام نشد"))
    });
  });
}

module.exports = {
  PhoneNumberGenerator,
  SignAccessToken,
  SignAccessRefrshToken,
  VerifyRefreshToken,
};
