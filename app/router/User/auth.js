const { UserAuthController } = require("../../http/controller/User/Auth/auth.controller");
const router=require("express").Router();
/**
 * @swagger
 *  tags:
 *     name: USer-Authentication
 *     description: user_auth section
 */
/**
 * @swagger
 *  /user/login:
 *      post:
 *          tags: [User_Athentication]
 *          summary: login user in userpanel with phonenumber
 *          description: one time password(OTP)login
 *          parameters: 
 *          -   name: mobile
 *               description: fa-IRI phonenumber
 *               in: formData
 *               required: true
 *               type: string
 *           responses:
 *                  200:    
 *                      description: Sucsess
 *                  404:
 *                      description: Bad Request
 *                  500:
 *                      description: Internal Server Error
 */
router.post("/login",UserAuthController.login)
module.exports={
    UserAuthRouter:router
}