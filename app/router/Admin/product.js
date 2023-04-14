
const { ProdutController } = require("../../http/controller/Admin/Product/product.controler");
const { uploadFile } = require("../../utils/multer");

const router=require("express").Router();
router.post("/add",uploadFile.array("images",10),ProdutController.addProduct);
router.get("/list",ProdutController.GetAllProduct)
router.get("/:id",ProdutController.GetOneProduct)
router.delete("/remove/:id",ProdutController.RemoveProductById)
router.patch("/edit/:id",uploadFile.array("images",10),ProdutController.EditProduct);
module.exports={
AdminProductRoutes:router    
}