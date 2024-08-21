import express from "express";
import Controller from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, Controller.getMessages);
router.post("/send/:id", protectRoute, Controller.sendMessage);

export default router;
