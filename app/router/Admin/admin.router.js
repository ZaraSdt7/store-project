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

router.use("/category",CategoryRoutes)
router.use("/blogs",BlogAdminRoutes)
router.use("/product",AdminProductRoutes)
router.use("/course",AdminCourseRouter)
router.use("/chapter",AdminChapterRouter)
router.use("/episode",AdminEpisodeRouter)
router.use("/user",UserAdminRouter)
router.use("/role",RoleAdminRouter)
router.use("/permission",PermissionAdminRouter)
module.exports={
    AdminRoutes:router
}