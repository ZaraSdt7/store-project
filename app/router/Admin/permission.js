const { PermissionController } = require("../../http/controller/Admin/RBAC/permission.controller");

const router=require("express").Router();
router.get("/list",PermissionController.GetAllPermissions);
router.post("/add",PermissionController.CreatePermissions);
router.delete("/remove/:id",PermissionController.RemovePermission)
module.exports={
    PermissionAdminRouter:router
}