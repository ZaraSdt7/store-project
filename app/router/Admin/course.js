
const { CourseController } = require("../../http/controller/Admin/Course/course.controller")
const { StringtoArray } = require("../../http/middleware/StringToArray")
const { uploadFile } = require("../../utils/multer")
const router=require("express").Router()

router.post("/add",uploadFile.single("image"),StringtoArray("tags"),CourseController.AddCourse)
router.patch("/update/:id",uploadFile.single("image"),CourseController.UpdateCourseByID)
router.get("/list",CourseController.GetListCourse)
router.get("/:id",CourseController.GetCourseByID)

module.exports={
AdminCourseRouter:router    
}