const { EpisodeController } = require("../../http/controller/Admin/Course/episode.controller");
const { uploadvideo } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add",uploadvideo.single("video"),EpisodeController.AddNewEpisode)
module.exports={
  AdminEpisodeRouter:router  
}