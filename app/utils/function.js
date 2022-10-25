const JWT = require("jsonwebtoken");
const createerror = require("http-errors");
const { UserModel } = require("../http/models/users");
const { ACCESS_TOKEN_SECRET_KEYS, REFRESH_TOKEN_KEY } = require("./constans");
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
    JWT.sign(payload, REFRESH_TOKEN_KEY, options, (err, token) => {
      if (err) reject(createerror.InternalServerError("خطای سرور"));
      resolve(token);
    });
  });
}
function VerifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_KEY, async (err, payload) => {
      if (err) reject(createerror.Unauthorized("وارد حساب کاربری خودشوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createerror.Unauthorized("حساب کاربری یافت نشد"));
      resolve(mobile);
    });
  });
}

module.exports = {
  PhoneNumberGenerator,
  SignAccessToken,
  SignAccessRefrshToken,
  VerifyRefreshToken,
};
