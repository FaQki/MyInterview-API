import { Router } from "express";
import * as videoCtrl from "../controllers/videos.controller";
import { authJwt } from "../middlewares";

const router = Router();

router.get("/videos", videoCtrl.getVideos);

router.get("/videos/:id", videoCtrl.getVideo);

router.post("/videos", [authJwt.verifyToken, authJwt.isUser], videoCtrl.createVideos);

router.delete("/videos/:id", videoCtrl.deleteVideos);

router.put("/videos/:id", [authJwt.verifyToken, authJwt.isUser], videoCtrl.updateVideos);

export default router;
