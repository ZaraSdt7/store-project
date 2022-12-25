const { Router } = require("express");
const { BlogController } = require("../../http/controller/Admin/blog.controler");
const { StringtoArray } = require("../../http/middleware/StringToArray");
const { uploadFile } = require("../../utils/multer");

const router=require("express").Router();
/**
 * @swagger
 *  /admin/blogs:
 *        get:
 *          tags: [Blog(Admin-Panel)]
 *          summary: get all blogs
 *          parameters:
 *            -    in: header
 *                 example: Bearer token ...
 *                 value: Bearer
 *                 name: access-token
 *                 type: string
 *                 required: true
 *          responses:
 *                  200:
 *                      description: success-get array of blogs
 */

router.get("/",BlogController.GetListOfBlog)
/**
 * @swagger
 *  /admin/blogs/add:
 *     post:
 *        tags: [Blog(Admin-Panel)]
 *        summary: create blog document
 *        consumer:
 *            - multipart/form-data
 *            - application/x-www-form-data-urlencoded
 *        parameters:
 *            -    in: header
 *                 example: Bearer token ...
 *                 value: Bearer
 *                 name: access-token
 *                 type: string
 *                 required: true
 *            -    in: formData
 *                 name: title
 *                 type: string
 *                 required: true
 *            -    in: formData
 *                 name: text
 *                 type: string
 *                 required: true
 *            -    in: formData
 *                 name: short_text
 *                 type: string
 *                 required: true
 *            -    in: formData
 *                 name: categories
 *                 type: string
 *                 required: true
 *            -    in: formData
 *                 name: tags
 *                 example: tag1#tag2#tag3#_foo#foo-bar || str || undefined
 *                 type: string
 *            -    in: formData
 *                 name: image
 *                 type: file
 *                 required: true
 *        responses:
 *                  200:
 *                      description: success
 */
router.post("/add",uploadFile.single("image"),StringtoArray("tags"),BlogController.CreateBlog)
module.exports={
   BlogAdminRoutes:router
}