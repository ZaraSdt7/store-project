const { CategoryController } = require("../../http/controller/Admin/category");
const router = require("express").Router();
/**
 * @swagger
 *  /admin/category/add:
 *        post:
 *          tags: [Category(Admin-Panel)]
 *          summary: create new category title
 *          parameters:
 *             -    in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *             -    in: formData
 *                  type: string
 *                  required: false
 *                  name: parent
 *          responses:
 *                  201:
 *                      description: success
 */

router.post("/add", CategoryController.AddCategory);
/**
 * @swagger
 *  /admin/category/parent:
 *        get:
 *          tags: [Category(Admin-Panel)]
 *          summary: get all parents of categories head
 *          responses:
 *                  200:
 *                      description: success
 */

router.get("/parent", CategoryController.getAllParents);
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *          get:
 *             tags: [Category(Admin-Panel)]
 *             summary: get all parent of categories
 *             parameters:
 *                -    in: path
 *                     name: parent
 *                     type: string
 *                     required: true
 *             responses:
 *                      200:
 *                         description: success
 */

router.get("/children/:parent", CategoryController.getChildrenOfParents);
/**
 * @swagger
 *  /admin/category/all:
 *        get:
 *          tags: [Category(Admin-Panel)]
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
 *             tags: [Category(Admin-Panel)]
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
/**
 * @swagger
 *  /admin/category/list-of-all:
 *        get:
 *          tags: [Category(Admin-Panel)]
 *          summary: get all categories without populate
 *          responses:
 *                  200:
 *                      description: success
 */

router.get("/list-of-all", CategoryController.getAllCategoryWithoutPopulate);
/**
 * @swagger
 *  /admin/category/{id}:
 *        get:
 *             tags: [Category(Admin-Panel)]
 *             summary: find categories with object-id
 *             parameters:
 *                -    in: path
 *                     name: id
 *                     type: string
 *                     required: true
 *             responses:
 *                     200:
 *                      description: success
 */
router.get("/:id", CategoryController.getCategoryById);

/**
 * @swagger
 *  /admin/category/update/{id}:
 *        patch:
 *             tags: [Category(Admin-Panel)]
 *             summary: edit or update categories with object-id
 *             parameters:
 *                -    in: path
 *                     name: id
 *                     type: string
 *                     required: true
 *                -    in: formData 
 *                     name: title
 *                     type: string
 *                     required: true
 *             responses:
 *                     200:
 *                      description: success
 *                     500:
 *                      description: InternalServerError 
 */

router.patch("/update/:id", CategoryController.UpdateCategories);
module.exports = {
  CategoryRoutes: router,
};
