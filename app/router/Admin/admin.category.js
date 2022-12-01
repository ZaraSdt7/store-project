const { CategoryRoutes } = require("./category");
const router=require("express").Router();

/**
 * @swagger
 *  tags:
 *      -   name: Admin-Panel
 *          description: action admin
 *      -   name: Category(Admin-Panel)
 *          description: all method and routes categories  
 *     
 */

router.use("/category",CategoryRoutes)
module.exports={
    AdminCategoryRoutes:router
}