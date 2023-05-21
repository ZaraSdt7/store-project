/**
 * @swagger
 *  components:
 *      schemas:
 *          Update-Profile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the first_name of user
 *                      example: zara
 *                  last_name:
 *                      type: string
 *                      description: the last_name of user
 *                      example: sdt
 *                  email:
 *                      type: string
 *                      description: the email of user
 *                      example: zara_sdt@gmail.com
 *                  user_name:
 *                      type: string
 *                      example: zara_sd
 *                      description: the username of user
 *                      
 */
/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  first_name:
 *                                      type: string
 *                                      example: "user first_name"
 *                                  last_name:
 *                                      type: string
 *                                      example: "user last_name"
 *                                  user_name:
 *                                      type: string
 *                                      example: "user_name"
 *                                  email:
 *                                      type: string
 *                                      example: "the_user_email@example.com"
 *                                  mobile:
 *                                      type: string
 *                                      example: "093600000"
 */
/**
 * @swagger
 *  /admin/user/list:
 *      get:
 *          tags: [User(Admin-Panel)]
 *          summary: get all of users
 *          parameters:
 *              -   in: params
 *                  name: search
 *                  type: string
 *                  description: search in user first_name, last_name, user_name, mobile, email
 *          responses :
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfUsers'
 */
/**
 * @swagger
 *  /admin/user/update-profile:
 *      patch:
 *           tags: [User(Admin-Panel)]
 *           summary: update user
 *           requestBody:
 *               required: true
 *               content:
 *                   application/x-www-form-urlencoded:
 *                       schema:
 *                           $ref: '#/components/schemas/Update-Profile'
 *                   application/json:      
 *                       schema:
 *                           $ref: '#/components/schemas/Update-Profile'
 *           responses:
 *                  200:
 *                      description: success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/publicDefinition'
 * 
 */