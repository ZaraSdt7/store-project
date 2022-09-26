const { HomeRouter } = require("./Api");
const router=require("express").Router();
router.use("/",HomeRouter)
module.exports={
    AllRouter:router
}