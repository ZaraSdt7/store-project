const { EpisodeController } = require("../../http/controller/Admin/Course/episode.controller");
const { uploadvideo } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add",uploadvideo.single("video"),EpisodeController.AddNewEpisode)
router.delete("/remove/:episodeID",EpisodeController.RemoveEpisode)
router.patch("/update/:episodeID",uploadvideo.single("video"),EpisodeController.UpdateEpisode)
module.exports={
  AdminEpisodeRouter:router  
}