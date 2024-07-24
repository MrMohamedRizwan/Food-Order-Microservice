import { Router, Response, NextFunction, Request } from "express";
import express from "express";
import {
	GetVandorProfile,
	UpdateVandorProfile,
	UpdateVandorService,
	VandorLogin,
} from "../controllers";
import { Authenticate } from "../middlewares";

const router = express.Router();
router.get("/", (req: Request, res: Response) => {
	res.send("Admin Page");
});

router.post("/login", VandorLogin);


router.get("/profile", Authenticate, GetVandorProfile);
router.patch("/profile",Authenticate, UpdateVandorProfile);
router.patch("/service",Authenticate, UpdateVandorService);
export { router as VandorRoutes };
