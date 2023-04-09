/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  parent:
 *                      type: string
 *                      description: the title of category
 */

/**
 * @swagger
 *  /admin/category/add:
 *        post:
 *          tags: [Category(Admin-Panel)]
 *          summary: create new category title
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *                  201:
 *                      description: success
 */

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
 *             requestBody:
 *                 required: true
 *                 content:
 *                     application/x-www-form-urlencoded:
 *                         schema:
 *                             $ref: '#/components/schemas/Category'
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Category'
 *             responses:
 *                     200:
 *                      description: success
 *                     500:
 *                      description: InternalServerError 
 */
