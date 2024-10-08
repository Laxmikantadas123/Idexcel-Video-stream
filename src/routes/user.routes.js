import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import upload from "../middelwares/multer.middelware.js"

const router = Router();

router
  .route("/registers")
  .post(
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
  );

export default router;
