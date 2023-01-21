const { Router } = require("express");
const blogControler = require("../../http/controller/Admin/blog.controler");
const { BlogController } = require("../../http/controller/Admin/blog.controler");
const { StringtoArray } = require("../../http/middleware/StringToArray");
const { uploadFile } = require("../../utils/multer");

const router=require("express").Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   categories
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  categories:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *          BlogUpdate:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example(tag1#tag2#tag_foo)
 *                  categories:
 *                      type: string
 *                      description: the id of category for foreinField in blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 */

/**
 * @swagger
 *  /admin/blogs:
 *        get:
 *          tags: [Blog(Admin-Panel)]
 *          summary: get all blogs
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
 *        requestBody:
 *            required: true
 *            content:
 *                multipart/form-data:
 *                    schema:
 *                        $ref: '#/components/schemas/Blog'
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
 *            -    in: path
 *                 name: id
 *                 type: string
 *                 required: true
 *        requestBody:
 *            required: true
 *            content:
 *                multipart/form-data:
 *                    schema:
 *                        $ref: '#/components/schemas/BlogUpdate'
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