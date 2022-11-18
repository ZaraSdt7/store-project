const { CategoryController } = require("../../http/controller/Admin/category");

const router=require("express").Router();
/**
 * @swagger
 *  /admin/category/add:
 *        post:
 *          tags: [Admin-Panel]
 *          summary: create new category title
 *          parameters:
 *             -    in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *             -    in: formData
 *                  type: string
 *                  required: true
 *                  name: parents
 *          responses:
 *                  201:  
 *                  description: success
 */

router.post("/add",CategoryController.AddCategory)
module.exports={
    CategoryRoutes:router
}