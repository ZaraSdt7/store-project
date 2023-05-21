const homeController = require("../../http/controller/Api/home.controller");
const { VerifyAccessToken } = require("../../http/middleware/VerifyAccessToken");
const router=require("express").Router();

/**
 * @swagger
 * /:    
 *  get:
 *      summary: index of routes
 *      tags: [(IndexPage)]
 *      description: get all need date for index page
 *      parameters:
 *         -    in: header
 *              name: access-token
 *              example: Bearer YourToken...
 *      responses:
 *          200:
 *            description: success
 *            schema: 
 *                  type: string
 *                  example: index page        
 *          404:
 *            description: Not Found
 */


router.get("/",VerifyAccessToken,homeController.IndexPage);
module.exports={
    HomeRouter:router
}