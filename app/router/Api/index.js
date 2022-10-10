const homeController = require("../../http/controller/Api/home.controller");
const router=require("express").Router();
/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: index page and router
 */
/**
 * @swagger
 * /:    
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get all need date for index page
 *      responses:
 *          200:
 *            description: success
 *          404:
 *            description: Not Found
 */


router.get("/",homeController.IndexPage);
module.exports={
    HomeRouter:router
}