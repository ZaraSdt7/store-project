const { BlogAdminRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const { AdminChapterRouter } = require("./chapter");
const { AdminCourseRouter } = require("./course");
const { AdminProductRoutes } = require("./product");
const router=require("express").Router();

router.use("/category",CategoryRoutes)
router.use("/blogs",BlogAdminRoutes)
router.use("/product",AdminProductRoutes)
router.use("/course",AdminCourseRouter)
router.use("/chapter",AdminChapterRouter)
module.exports={
    AdminRoutes:router
}