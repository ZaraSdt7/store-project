const { CheckPermissions } = require("../../http/middleware/permission.guard");
const { PERMISSIONS } = require("../../utils/constans");
const { BlogAdminRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const { AdminChapterRouter } = require("./chapter");
const { AdminCourseRouter } = require("./course");
const { AdminEpisodeRouter } = require("./episode");
const { PermissionAdminRouter } = require("./permission");
const { AdminProductRoutes } = require("./product");
const { RoleAdminRouter } = require("./role");
const { UserAdminRouter } = require("./user");
const router=require("express").Router();

router.use("/category",CheckPermissions([PERMISSIONS.CONTENT_MANAGER]),CategoryRoutes)
router.use("/blogs",CheckPermissions([PERMISSIONS.TEACHER,PERMISSIONS.CONTENT_MANAGER]),BlogAdminRoutes)
router.use("/product",CheckPermissions([PERMISSIONS.SUPPLIER,PERMISSIONS.CONTENT_MANAGER]),AdminProductRoutes)
router.use("/course",CheckPermissions([PERMISSIONS.TEACHER]),AdminCourseRouter)
router.use("/chapter",CheckPermissions([PERMISSIONS.TEACHER]),AdminChapterRouter)
router.use("/episode",CheckPermissions([PERMISSIONS.TEACHER]),AdminEpisodeRouter)
router.use("/user",UserAdminRouter)
router.use("/role",CheckPermissions([PERMISSIONS.ADMIN]),RoleAdminRouter)
router.use("/permission",CheckPermissions(PERMISSIONS.ADMIN),PermissionAdminRouter)
module.exports={
    AdminRoutes:router
}