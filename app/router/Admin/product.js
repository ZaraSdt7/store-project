const { ProdutController } = require("../../http/controller/Admin/product.controler");
const { uploadFile } = require("../../utils/multer");

const router=require("express").Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          product:
 *              type: object
 *              required:
 *                 -    title
 *                 -    short_text
 *                 -    category
 *                 -    price
 *                 -    discount
 *                 -    count
 *              properties:
 *                  title:
 *                      type: string
 *                      descrition: the title product
 *                      example: عنوان اول
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن اول
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن عنوان اول
 *                  category:
 *                      type: string
 *                      description: the title of product
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                      example: 70000
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                      example: 20
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                      example: 100
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                      example: 0
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                      example: 0
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                      example: 0
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                      example: 0
 *                  type:
 *                      type: string
 *                      description: the type of product 
 *                      example: virtual - physical
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Product:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان محصول
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 *                  category:
 *                      type: string
 *                      description: the title of product
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                      example: 20
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                      example: 100
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                      example: 0
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                      example: 0
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                      example: 0
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                      example: 0
 *                  type:
 *                      type: string
 *                      description: the type of product 
 *                      example: virtual - physical
*/

/**
 * @swagger
 *  /admin/product/add:
 *      post:
 *          tags: [Product(Admin-Panel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/product'
 *          
 *          responses:
 *              200:
 *                  description: created new Product
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
router.post("/add",uploadFile.array("images",10),ProdutController.addProduct);
/**
 * @swagger
 *  /admin/product/list:
 *      get:
 *          tags: [Product(Admin-Panel)]
 *          summary: get all products
 *          parameters:
 *               -  in: query
 *                  name: search
 *                  type: string
 *                  description: query search for text,short_text,title product
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/list",ProdutController.GetAllProduct)
/**
 * @swagger
 *  /admin/product/{id}:
 *      get:
 *          tags: [Product(Admin-Panel)]
 *          summary: get id products
 *          parameters:
 *               -  in: path
 *                  name: id
 *                  type: string
 *                  description: product id
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id",ProdutController.GetOneProduct)
/**
 * @swagger
 *  /admin/product/remove/{id}:
 *      delete:
 *          tags: [Product(Admin-Panel)]
 *          summary: delete id products
 *          parameters:
 *               -  in: path
 *                  name: id
 *                  type: string
 *                  description: delete product id
 *          responses:
 *              200:
 *                  description: success
 */
router.delete("/remove/:id",ProdutController.RemoveProductById)
/**
 * @swagger
 *  /admin/product/edit/{id}:
 *      patch:
 *          tags: [Product(Admin-Panel)]
 *          summary: create and save product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: product-id for update
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Product'
 *          responses:
 *              200:
 *                  description: updated Product
 */
router.patch("/edit/:id",uploadFile.array("images",10),ProdutController.EditProduct);
module.exports={
AdminProductRoutes:router    
}