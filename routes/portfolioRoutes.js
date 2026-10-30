import { Router } from "express";
import { getProfile } from "../Controllers/portfolioController.js";

const router = Router();

router.get("/profile", getProfile);

export default router;