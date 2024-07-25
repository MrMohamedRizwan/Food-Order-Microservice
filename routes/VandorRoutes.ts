import { Router, Response, NextFunction, Request } from "express";
import express from "express";
import {
	addFood,
	GetFoods,
	GetVandorProfile,
	UpdateVandorProfile,
	UpdateVandorService,
	UpdateVendorCoverImage,
	VandorLogin,
} from "../controllers";
import { Authenticate } from "../middlewares";
import multer from "multer";

const imageStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "images");
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + "_" + file.originalname);
	},
});

const images = multer({ storage: imageStorage }).array("images", 10);

const router = express.Router();
router.get("/", (req: Request, res: Response) => {
	res.send("Admin Page");
});

router.post("/login", VandorLogin);

router.get("/profile", Authenticate, GetVandorProfile);
router.patch("/profile", Authenticate, UpdateVandorProfile);
router.patch("/service", Authenticate, UpdateVandorService);

router.post("/food", Authenticate, images, addFood);
router.get("/foods", Authenticate, GetFoods);
router.patch("/coverimage", Authenticate, images, UpdateVendorCoverImage);
export { router as VandorRoutes };
