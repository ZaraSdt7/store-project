const {
  UserAuthController,
} = require("../../http/controller/User/Auth/auth.controller");
const router = require("express").Router();
/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                  code:
 *                      type: integer
 *                      description: reviced code from getOTP 
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: enter refresh-token for get fresh token and refresh-token
 */
/**
 * @swagger
 *  tags:
 *     name: USer-Authentication
 *     description: user_auth section
 */
/**
 * @swagger
 *   /user/get-otp:
 *      post:
 *        tags: [User-Athentication]
 *        summary: login user in userpanel with phonenumber
 *        description: one time password(OTP)login
 *        requestBody:
 *            required: true
 *            content: 
 *                 application/x-www-form-urlencoded:
 *                     schema:
 *                         $ref: '#/components/schemas/GetOTP'
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/GetOTP'  
 *        responses:
 *                200:
 *                  description: Sucsess
 *                404:
 *                  description: Bad Request
 *                500:
 *                  description: Internal Server Error
 */
router.post("/get-otp", UserAuthController.GetOtp);
/**
 * @swagger
 *   /user/check-otp:
 *      post:
 *        tags: [User-AuthController]
 *        summary: check-otp value in user controller
 *        description: check-otp with code-mobile and expires date
 *        requestBody:
 *            required: true
 *            content:
 *                application/x-www-form-urlencoded:
 *                    schema:
 *                        $ref: '#/components/schemas/CheckOTP'
 *                application/json:
 *                    schema:
 *                        $ref: '#/components/schemas/CheckOTP'
 *        responses:
 *                200:
 *                  description:  success
 *                404:
 *                  description:  Bad Request
 *                500:
 *                  description: InternalServerError
 *
 */
router.post("/check-otp", UserAuthController.CheckOtp);
/**
 * @swagger
 *   /user/Refresh-token:
 *      post:
 *          tags: [User-AuthController]
 *          summary: send refresh token for get new token and refreshtoken
 *          description: refresh token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *          responses:
 *                  200:
 *                       description: success
 */
router.post("/Refresh-token", UserAuthController.RefreshToken);
module.exports = {
  UserAuthRouter: router
};
