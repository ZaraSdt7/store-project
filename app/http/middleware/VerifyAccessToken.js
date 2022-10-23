const createerror = require("http-errors");
const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEYS } = require("../../utils/constans");
const { UserModel } = require("../models/users");
function VerifyAccessToken(req, res, next) {
  const headers = req.headers;
  const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer)) {
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEYS, async (err, payload) => {
      if (err)
        return next(createerror.Unauthorized("وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) return next(createerror.Unauthorized("کاربری یافت نشد"));
      req.user = user;
      return next();
    });
  } else return next(createerror.Unauthorized("واردحساب کاربری خود شوید"));
}
module.exports = {
  VerifyAccessToken,
};
