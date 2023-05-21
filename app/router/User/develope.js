const { PhoneNumberGenerator } = require("../../utils/function");
const router=require("express").Router();
const bcrypt=require("bcrypt");
//const { models } = require("mongoose");
/**
 * @swagger
 *  /developer/password-hash/{password}:
 *      get:
 *          tags: [(Developer-Router)]
 *          summary: hash data with bcrypt
 *          parameters:
 *              -   in: path
 *                  name: password
 *                  type : string
 *                  required: true
 *          responses:
 *                  200:
 *                    description: success
 *          
 */
router.get("/password-hash/:password",(req,res,next)=>{
    const {password}=req.params;
    const salt=bcrypt.genSaltSync(10);
    return res.send(bcrypt.hashSync(password,salt));

})

/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          tags: [(Developer-Router)]
 *          summary: get random number
 *          responses:
 *                  200:
 *                      description: success    
 *  
 */
router.get("/random-number",(req,res,next)=>{
    return res.send(PhoneNumberGenerator().toString())
})
module.exports={
    DeveloperRoutes:router
}