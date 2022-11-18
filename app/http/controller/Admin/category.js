const { CategoryModel } = require("../../models/categories");
const { categorySchema } = require("../../validations/admin/category.schema");
const createerror = require("http-errors");
const Controller = require("../controller");

class CategoryController extends Controller {
  async AddCategory(req, res, next) {
    try {
      await categorySchema.validateAsync(req.body);
      const { title, parents } = req.body;
      const category = await CategoryModel.create({ title, parents });
      if (!category) throw createerror.InternalServerError("خطای داخلی");
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "دسته بندی با موفقیت ثبت شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }












  
}

module.exports={
    CategoryController:new CategoryController()
}