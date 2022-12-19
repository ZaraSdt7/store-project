const { BlogAdminRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const router=require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action admin
 *      -   name: Category(Admin-Panel)
 *          description: all method and routes categories
 *      -   name: Blog(Admin-Panel)  
 *          description: all method router of blogs
 */

router.use("/category",CategoryRoutes)
router.use("/blogs",BlogAdminRoutes)
module.exports={
    AdminCategoryRoutes:router
}