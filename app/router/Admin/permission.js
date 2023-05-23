const { PermissionController } = require("../../http/controller/Admin/RBAC/permission.controller");

const router=require("express").Router();
router.get("/list",PermissionController.GetAllPermissions);
router.post("/add",PermissionController.CreatePermissions)
module.exports={
    PermissionAdminRouter:router
}