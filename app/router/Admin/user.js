const { UserController } = require("../../http/controller/Admin/Users/user.controller");
const { CheckPermissions } = require("../../http/middleware/permission.guard");
const { PERMISSIONS } = require("../../utils/constans");

const router = require("express").Router();
router.get("/list",CheckPermissions([PERMISSIONS.ADMIN]),UserController.GetAllUsers)
router.patch("/update-profile",UserController.UpdateUser)
router.get("/profile",CheckPermissions([]),UserController.UserProfile)
module.exports = {
    UserAdminRouter:router
}