const { ChapterController } = require("../../http/controller/Admin/Course/chapter.controller");

const router=require("express").Router();

router.put("/add",ChapterController.AddChapter);
router.get("/list/:courseID",ChapterController.ChapterOfCourse)
module.exports={
    AdminChapterRouter:router
}