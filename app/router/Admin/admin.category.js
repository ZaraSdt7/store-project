const { CategoryRoutes } = require("./category");

const router=require("express").Router();

/**
 * @swagger
 *  tags:
 *     name: Admin-Panel
 *     description: action admin
 */

router.post("/category",CategoryRoutes)
module.exports={
    AdminCategoryRoutes:router
}