const { UserController } = require("../../http/controller/Admin/Users/user.controller");

const router = require("express").Router();
router.get("/list",UserController.GetAllUsers)
router.patch("/update-profile",UserController.UpdateUser)
module.exports = {
    UserAdminRouter:router
}