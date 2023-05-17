const { UserController } = require("../../http/controller/Admin/Users/user.controller");

const router = require("express").Router();
router.get("/list",UserController.GetAllUsers)
module.exports = {
    UserAdminRouter:router
}