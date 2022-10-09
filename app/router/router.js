const { HomeRouter } = require("./Api");
const { UserAuthRouter } = require("./User/auth");
const router=require("express").Router();
router.use("/user",UserAuthRouter)
router.use("/",HomeRouter)
module.exports={
    AllRouter:router
}