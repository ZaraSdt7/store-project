const { CategoryController } = require("../../http/controller/Admin/category");
const router = require("express").Router();
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
 *                  required: false
 *                  name: parents
 *          responses:
 *                  201:
 *                      description: success
 */

router.post("/add", CategoryController.AddCategory);
/**
 * @swagger
 *  /admin/category/parents:
 *        get:
 *          tags: [Admin-Panel]
 *          summary: get all parents of categories head
 *          responses:
 *                  200:
 *                      description: success
 */

router.get("/parents", CategoryController.getAllParents);
/**
 * @swagger
 *  /admin/category/children/{parents}:
 *          get:
 *          tags: [Admin-Panel]
 *          summary: get all parents of categories
 *          parameters:
 *              -    in: path
 *                   name: children
 *                   type: string
 *                   required: true
 *          responses:
 *                  200:
 *                      description: success
 */

router.get("/children/:parents", CategoryController.getChildrenOfParents);
/**
 * @swagger
 *  /admin/category/all:
 *        get:
 *          tags: [Admin-Panel]
 *          summary: get all categories
 *          responses:
 *                  200:
 *                      description: success
 */

router.get("/all", CategoryController.getAllCategory);

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *        delete:
 *             tags: [Admin-Panel]
 *             summary: remove categories with object
 *             parameters:
 *                -    in: path
 *                     name: id
 *                     type: string
 *                     required: true
 *             responses:
 *                     200:
 *                      description: success
 */

router.delete("/remove/:id", CategoryController.RemoveCategory);
module.exports = {
  CategoryRoutes: router,
};
