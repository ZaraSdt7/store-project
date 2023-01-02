const { Router } = require("express");
const blogControler = require("../../http/controller/Admin/blog.controler");
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
 *                 value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM2MzA5NjE3MCIsImlhdCI6MTY3MjY1Mzg2NSwiZXhwIjoxNjcyNjU3NDY1fQ.IG_ZepHIwbkFIYbhIbmhCKjubTCwXs2bX5hoNJlB9_8
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
 *        parameters:
 *            -    in: header
 *                 example: Bearer token ...
 *                 value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM2MzA5NjE3MCIsImlhdCI6MTY3MjY1Mzg2NSwiZXhwIjoxNjcyNjU3NDY1fQ.IG_ZepHIwbkFIYbhIbmhCKjubTCwXs2bX5hoNJlB9_8
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
/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *     patch:
 *        tags: [Blog(Admin-Panel)]
 *        summary: create blog document
 *        consumer:
 *            - multipart/form-data
 *        parameters:
 *            -    in: header
 *                 example: Bearer token ...
 *                 value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM2MzA5NjE3MCIsImlhdCI6MTY3MjY1Mzg2NSwiZXhwIjoxNjcyNjU3NDY1fQ.IG_ZepHIwbkFIYbhIbmhCKjubTCwXs2bX5hoNJlB9_8
 *                 name: access-token
 *                 type: string
 *                 required: true
 *            -    in: path
 *                 name: id
 *                 type: string
 *                 required: true
 *            -    in: formData
 *                 name: title
 *                 type: string
 *            -    in: formData
 *                 name: text
 *                 type: string
 *            -    in: formData
 *                 name: short_text
 *                 type: string
 *            -    in: formData
 *                 name: categories
 *                 type: string
 *            -    in: formData
 *                 name: tags
 *                 example: tag1#tag2#tag3#_foo#foo-bar || str || undefined
 *                 type: string
 *            -    in: formData
 *                 name: image
 *                 type: file
 *        responses:
 *                  200:
 *                      description: success
 */
router.patch("/update/:id",uploadFile.single("image"),StringtoArray("tags"),BlogController.UpdateBlogByID)
/**
 * @swagger
 *  /admin/blogs/{id}:
 *        get:
 *           tags: [Blog(Admin-Panel)]
 *           summary: get blog by id and populate this feild
 *           parameters:
 *            -    in: header
 *                 example: Bearer token ...
 *                 value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM2MzA5NjE3MCIsImlhdCI6MTY3MjY1Mzg2NSwiZXhwIjoxNjcyNjU3NDY1fQ.IG_ZepHIwbkFIYbhIbmhCKjubTCwXs2bX5hoNJlB9_8
 *                 name: access-token
 *                 type: string
 *                 required: true
 *            -    in: path
 *                 name: id
 *                 type: string
 *                 required: true
 *           responses:
 *                      200:
 *                           description: success
 *                 
 * 
 */
router.get("/:id",BlogController.GetOneById);
/**
 * @swagger
 *  /admin/blogs/delete/{id}:
 *        delete:
 *           tags: [Blog(Admin-Panel)]
 *           summary: delete blog by id and populate this feild
 *           parameters:
 *            -    in: header
 *                 example: Bearer token ...
 *                 value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM2MzA5NjE3MCIsImlhdCI6MTY3MjY1Mzg2NSwiZXhwIjoxNjcyNjU3NDY1fQ.IG_ZepHIwbkFIYbhIbmhCKjubTCwXs2bX5hoNJlB9_8
 *                 name: access-token
 *                 type: string
 *                 required: true
 *            -    in: path
 *                 name: id
 *                 type: string
 *                 required: true
 *           responses:
 *                      200:
 *                           description: success
 *                 
 * 
 */

router.delete("/:id",BlogController.DeleteBlogByID);
module.exports={
   BlogAdminRoutes:router
}