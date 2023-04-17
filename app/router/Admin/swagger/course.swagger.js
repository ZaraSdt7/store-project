/**
 * @swagger
 *  components:
 *      schemas:
 *          types: 
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special             
 *          Status: 
 *              type: boolean
 *              enum:
 *                  -   true
 *                  -   false          
 */ 
/**
 * {
 *  statusCode: 200,
 *  data: {
 *      courses : [{}, {}, {}]
 *  }
 * }
 */

/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  title:
 *                                      type: string
 *                                      example: "title of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary text of course"
 *                                  text:
 *                                      type: string
 *                                      example: "text and describe of course"
 *                                  status:
 *                                      type: string
 *                                      example: "notStarted | Completed | Holding"
 *                                  time:
 *                                      type: string
 *                                      example: "01:22:34"
 *                                  price:
 *                                      type: integer
 *                                      example: 250,000
 *                                  discount:
 *                                      type: interger
 *                                      example: 20
 *                                  teacher:
 *                                      type: string
 *                                      example: "zara sdt"
*/

/**
 * @swagger
 *  components:
 *      schemas:
 *          Insert-Course:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: string
 *                      description: the title of course
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of course
 *                      example: متن توضیحات کامل دوره به صورت تستی
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the cqtegory of course
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of course
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of course
 *                      example: 0
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type:
 *                      $ref: '#/components/schemas/types'
 * 
 */

/**
 * @swagger
 *  /admin/course/add:
 *      post:
 *          tags: [Course(Admin-Panel)]
 *          summary: create and save course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Insert-Course'
 *          
 *          responses:
 *              200:
 *                  description: created new course
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
* @swagger
 *  /admin/course/list:
 *      get:
 *          tags: [Course(Admin-Panel)]
 *          summary: get all of courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in course text, title, short_text
 *          responses :
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */

/**
* @swagger
 *  /admin/course/{id}:
 *      get:
 *          tags: [Course(Admin-Panel)]
 *          summary: get all of course By ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: Get ID Course
 *          responses :
 *              200:
 *                  description: success
 */

