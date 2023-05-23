const { RoleController } = require("../../http/controller/Admin/RBAC/role.controller");
const { StringtoArray } = require("../../http/middleware/StringToArray");

const router=require("express").Router();
router.get("/list",RoleController.GetAllRoles);
router.post("/add",StringtoArray("permissions"),RoleController.CreateRole)
module.exports={
    RoleAdminRouter:router
}