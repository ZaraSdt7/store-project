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
 *                  -   RefreshToken
 *              properties:
 *                  RefreshToken:
 *                      type: string
 *                      description: enter refresh-token for get fresh token and refresh-token
 */


/**
 * @swagger
 *   /user/get-otp:
 *      post:
 *        tags: [(User-Athentication)]
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

/**
 * @swagger
 *   /user/check-otp:
 *      post:
 *        tags: [(User-AuthController)]
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

/**
 * @swagger
 *   /user/Refresh-token:
 *      post:
 *          tags: [(User-AuthController)]
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