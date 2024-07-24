import { Router, Request, Response, NextFunction } from "express";
import express from "express";
import { createVandor, getVedors, getVedorsbyId } from "../controllers";
const router = express.Router();

router.post("/vandor", createVandor);
router.get("/getvandors", getVedors);
router.get("/getvandors/:id", getVedorsbyId);

router.get("/", (req: Request, res: Response) => {
	res.send("Admin Page");
});

export { router as AdminRoutes };
