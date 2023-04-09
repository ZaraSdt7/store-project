const { Router } = require("express");
const blogControler = require("../../http/controller/Admin/blog.controler");
const { BlogController } = require("../../http/controller/Admin/blog.controler");
const { StringtoArray } = require("../../http/middleware/StringToArray");
const { uploadFile } = require("../../utils/multer");
const router=require("express").Router();

router.get("/",BlogController.GetListOfBlog)
router.post("/add",uploadFile.single("image"),StringtoArray("tags"),BlogController.CreateBlog)
router.patch("/update/:id",uploadFile.single("image"),StringtoArray("tags"),BlogController.UpdateBlogByID)
router.get("/:id",BlogController.GetOneById);
router.delete("/:id",BlogController.DeleteBlogByID);
module.exports={
   BlogAdminRoutes:router
}