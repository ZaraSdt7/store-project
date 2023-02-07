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
 *                 -    tags
 *                 -    category
 *                 -    price
 *                 -    discount
 *                 -    count
 *              properties:
 *                  title:
 *                      type: string
 *                      descrition: the title product
 *                      example: عنوان مسِئله
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 *                  tags:
 *                      type: array
 *                      description: the title of product
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
 *                  image:
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
 *          tags: [Product(AdminPanel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/product'
 *          
 *          responses:
 *              201:
 *                  description: created new Product
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
router.post("/add",uploadFile.single("image"),ProdutController.addProduct);
/**
 * @swagger
 *  /admin/product/list:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: get all products
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/list",ProdutController.GetAllProduct)
module.exports={
AdminProductRoutes:router    
}