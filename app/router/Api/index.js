const homeController = require("../../http/controller/Api/home.controller");
const router=require("express").Router();
router.post("/",homeController.IndexPage);
module.exports={
    HomeRouter:router
}