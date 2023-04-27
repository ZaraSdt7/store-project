const chapterController = require("../../http/controller/Admin/Course/chapter.controller");
const { ChapterController } = require("../../http/controller/Admin/Course/chapter.controller");

const router=require("express").Router();

router.put("/add",ChapterController.AddChapter);
router.get("/list/:courseID",ChapterController.ChapterOfCourse)
router.patch("/remove/:chapterID",ChapterController.RemoveChapterByID)
router.patch("/update/:chapterID",ChapterController.UpdateChapterByID)
module.exports={
    AdminChapterRouter:router
}