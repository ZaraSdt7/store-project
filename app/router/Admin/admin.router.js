const { BlogAdminRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const { AdminChapterRouter } = require("./chapter");
const { AdminCourseRouter } = require("./course");
const { AdminEpisodeRouter } = require("./episode");
const { AdminProductRoutes } = require("./product");
const router=require("express").Router();

router.use("/category",CategoryRoutes)
router.use("/blogs",BlogAdminRoutes)
router.use("/product",AdminProductRoutes)
router.use("/course",AdminCourseRouter)
router.use("/chapter",AdminChapterRouter)
router.use("/episode",AdminEpisodeRouter)
module.exports={
    AdminRoutes:router
}