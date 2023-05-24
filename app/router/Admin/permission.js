const { PermissionController } = require("../../http/controller/Admin/RBAC/permission.controller");

const router=require("express").Router();
router.get("/list",PermissionController.GetAllPermissions);
router.post("/add",PermissionController.CreatePermissions);
router.delete("/remove/:id",PermissionController.RemovePermission)
router.patch("/update/:id",PermissionController.UpdatePermissionByID)
module.exports={
    PermissionAdminRouter:router
}