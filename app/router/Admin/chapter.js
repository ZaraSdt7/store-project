const { ChapterController } = require("../../http/controller/Admin/Course/chapter.controller");

const router=require("express").Router();

router.put("/add",ChapterController.AddChapter);
module.exports={
    AdminChapterRouter:router
}