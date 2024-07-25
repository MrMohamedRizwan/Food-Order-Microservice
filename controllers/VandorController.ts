import { Request, Response, NextFunction } from "express";
import { CreateFoodInput, EditVandorInput, VandorLogiInput } from "../dto";
import { FindVendor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";
import { Food } from "../models/Food";

export const VandorLogin = async (req: Request, res: Response) => {
	const { email, password } = <VandorLogiInput>req.body;
	// console.log(email,password);
	const existingVendor = await FindVendor("", email);
	// console.log(existingVendor);
	if (existingVendor !== null) {
		const validataion = await ValidatePassword(
			password,
			existingVendor.password,
			existingVendor.salt,
		);
		if (validataion) {
			const signature = await GenerateSignature({
				_id: existingVendor._id as string,
				email: existingVendor.email,
				name: existingVendor.name,
				foodtypes: existingVendor.foodType,
			});
			return res.json(signature);
			// return res.status(200).json({ message: "Login Successfull" });
		} else return res.status(403).json({ message: "Password is not correct" });
	} else {
		return res
			.status(403)
			.json({ message: "A vandor is not exist with this email ID" });
	}
};
export const GetVandorProfile = async (req: Request, res: Response) => {
	const user = req.user;
	if (user) {
		const existingVendor = await FindVendor(user._id);
		return res.json(existingVendor);
	}
	return res.status(403).json({ message: "Vandor Info notfound" });
};
export const UpdateVandorProfile = async (req: Request, res: Response) => {
	const { name, address, phone, foodType } = <EditVandorInput>req.body;
	const user = req.user;

	if (user) {
		const existingVendor = await FindVendor(user._id);
		if (existingVendor !== null) {
			existingVendor.name = name;
			existingVendor.address = address;
			existingVendor.phone = phone;
			existingVendor.foodType = foodType;
			const savedResult = await existingVendor.save();
			return res.json(savedResult);
		}
		return res.json(existingVendor);
	}
	return res.status(403).json({ message: "Vandor Info notfound" });
};
export const UpdateVandorService = async (req: Request, res: Response) => {
	const user = req.user;
	if (user) {
		const existingUser = await FindVendor(user._id);
		if (existingUser !== null) {
			existingUser.serviceAvailable = !existingUser.serviceAvailable;
			const savedResult = await existingUser.save();
			return res.json(savedResult);
		}
	}
};

export const addFood = async (req: Request, res: Response) => {
	try {
		const user = req.user;
		// console.log(user);
		const { name, description, category, foodType, readyTime, price } = <
			CreateFoodInput
		>req.body;

		if (!user) throw new Error("User not found");

		const vendor = await FindVendor(user._id);

		if (vendor !== null) {
			const files = req.files as [Express.Multer.File];

			const images = files.map((file: Express.Multer.File) => file.filename);
			const createfood = await Food.create({
				VandorId: vendor._id,
				name: name,
				description: description,
				category: category,
				foodType: foodType,
				readytime: readyTime,
				price: price,
				rating: 0,
				images: images,
			});

			vendor.foods.push(createfood._id);
			const result = await vendor.save();

			return res.json(result);
		} else {
			return res.status(404).json({ message: "Vendor not found" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export const UpdateVendorCoverImage = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.user;

	const { name, description, category, foodType, readyTime, price } = <
		CreateFoodInput
	>req.body;

	if (user) {
		const vendor = await FindVendor(user._id);

		if (vendor !== null) {
			const files = req.files as [Express.Multer.File];

			const images = files.map((file: Express.Multer.File) => file.filename);

			const food = await Food.create({
				vendorId: vendor._id,
				name: name,
				description: description,
				category: category,
				price: price,
				rating: 0,
				readyTime: readyTime,
				foodType: foodType,
				images: images,
			});

			vendor.foods.push(food);
			const result = await vendor.save();
			return res.json(result);
		}
	}
	return res.json({ message: "Unable to Update vendor profile " });
};

export const GetFoods = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.user;
	if (user) {
		const foods = await Food.find({ VandorId: user._id });
		// console.log(foods)

		if (foods !== null) {
			return res.json(foods);
		}
	}
	return res.json({ message: "Foods not found!" });
};
