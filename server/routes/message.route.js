import express from "express";
import Controller from "../controllers/message.controller.js";

const router = express.Router();

router.get("/send/:id", Controller.sendMessage);
router.post("/send/:id", Controller.sendMessage);

export default router;
