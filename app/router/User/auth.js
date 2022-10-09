const { UserAuthController } = require("../../http/controller/User/Auth/auth.controller");
const router=require("express").Router();
router.post("/login",UserAuthController.login)
module.exports={
    UserAuthRouter:router
}