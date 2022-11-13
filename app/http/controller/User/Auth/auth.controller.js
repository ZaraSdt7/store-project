const { extend, object } = require("@hapi/joi");
const keys = require("@hapi/joi/lib/types/keys");
const createerror = require("http-errors");
const {  USER_ROLE } = require("../../../../utils/constans");
const { PhoneNumberGenerator,SignAccessToken,VerifyRefreshToken,SignAccessRefrshToken,} =require("../../../../utils/function");
const users = require("../../../models/users");
const { UserModel } = require("../../../models/users");
const { CheckOtpSchema, GetOtpSchema,} = require("../../../validations/user/auth.Schema");
const Controller = require("../../controller");
class UserAuthController extends Controller {
  async GetOtp(req, res, next) {
    try {
      await GetOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = PhoneNumberGenerator();
      const result = await this.SaveUser(mobile, code);
      if (!result) throw createerror.Unauthorized("ورود شما انجام نشد");
      return res.status(200).send({
        data: {
          statuscode: 200,
          message: "کد اعتبارسنجی باموفقیت ارسال شد",
          code,
          mobile,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async CheckOtp(req, res, next) {
    try {
      await CheckOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile });
      if (!user) throw createerror.NotFound("کاربر یافت نشد");
      if (user.otp.code != code) throw createerror.Unauthorized("کد ارسال شده صحیح نیست");
      const nowdate = Date.now();
      if (+user.otp.expiresIn < nowdate) throw createerror.Unauthorized("کد شما منقضی شده است");
      const accesstoken = await SignAccessToken(user._id);
      const refreshToken = await SignAccessRefrshToken(user._id);
      return res.json({
        data: { accesstoken, 
          refreshToken ,
         
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async RefreshToken(req, res, next) {
    try {
      const { RefreshToken } = req.body;
      const mobile = await VerifyRefreshToken(RefreshToken);
      const user = await UserModel.findOne({ mobile });
      const accesstoken = await SignAccessToken(user._id);
      const newrefeshtoken = await SignAccessRefrshToken(user._id);
      return res.json({
        data: {
          accesstoken,
          RefreshToken:newrefeshtoken,
        
          
        }
      });
    } catch (error) {
      next(error);
    }
  }
  async SaveUser(mobile, code) {
    let otp = {
      code,
      expiresIn: (new Date().getTime()+ 120000),
    };
    const result = await this.CheckLogin(mobile);
    if (result) {
      return (await this.UpdateUser(mobile, { otp }));
    }
    return !!(await UserModel.create({
      mobile,
      otp,
      Roles: [USER_ROLE.USER]
    }));
  }
  async CheckLogin(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }
  async UpdateUser(mobile, objectDate = {}) {
    Object.keys(objectDate).forEach((key) => {
      if (["", " ", NaN, undefined, 0, "0", null].includes(objectDate[key]))
        delete objectDate[key];
    });
    const UpdateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectDate }
    );
    return !!UpdateResult.modifiedCount;
  }
}
module.exports = {
  UserAuthController: new UserAuthController(),
};
