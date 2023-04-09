const {
  UserAuthController,
} = require("../../http/controller/User/Auth/auth.controller");
const router = require("express").Router();
router.post("/get-otp", UserAuthController.GetOtp);
router.post("/check-otp", UserAuthController.CheckOtp);
router.post("/Refresh-token", UserAuthController.RefreshToken);
module.exports = {
  UserAuthRouter: router
};
