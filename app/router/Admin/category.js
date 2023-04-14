const { CategoryController } = require("../../http/controller/Admin/Category/category");

const router = require("express").Router();

router.post("/add",CategoryController.AddCategory);
router.get("/parent", CategoryController.getAllParents);
router.get("/children/:parent", CategoryController.getChildrenOfParents);
router.get("/all", CategoryController.getAllCategory);
router.delete("/remove/:id", CategoryController.RemoveCategory);
router.get("/list-of-all", CategoryController.getAllCategoryWithoutPopulate);
router.get("/:id", CategoryController.getCategoryById);
router.patch("/update/:id", CategoryController.UpdateCategories);
module.exports = {
  CategoryRoutes: router,
};
