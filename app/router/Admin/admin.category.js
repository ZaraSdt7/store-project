const { CategoryRoutes } = require("./category");
const router=require("express").Router();

/**
 * @swagger
 *  tags:
 *     name: Admin-Panel
 *     description: action admin
 */

router.use("/category",CategoryRoutes)
module.exports={
    AdminCategoryRoutes:router
}