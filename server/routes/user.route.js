import express from "express";
import Controller from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, Controller.getUsers);

export default router;
