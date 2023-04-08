const { VerifyAccessToken } = require("../../http/middleware/VerifyAccessToken");
const { BlogAdminRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const { AdminCourseRouter } = require("./course");
const { AdminProductRoutes } = require("./product");
const router=require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action admin
 *      -   name: Course(Admin-Panel)
 *          description: all method and routers course
 *      -   name: Category(Admin-Panel)
 *          description: all method and routes categories
 *      -   name: Product(Admin-Panel)
 *          description: all method and routes product
 *      -   name: Blog(Admin-Panel)  
 *          description: all method router of blogs
 */

router.use("/category",CategoryRoutes)
router.use("/blogs",BlogAdminRoutes)
router.use("/product",AdminProductRoutes)
router.use("/course",AdminCourseRouter)
module.exports={
    AdminCategoryRoutes:router
}