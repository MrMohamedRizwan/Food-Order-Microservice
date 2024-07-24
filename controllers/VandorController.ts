import { Request, Response, NextFunction } from "express";
import { EditVandorInput, VandorLogiInput } from "../dto";
import { FindVendor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";

export const VandorLogin = async (req: Request, res: Response) => {
	const { email, password } = <VandorLogiInput>req.body;
	// console.log(email,password);
	const existingVendor = await FindVendor("", email);
	console.log(existingVendor);
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
	const user=req.user;
	if(user)
	{
		const existingUser=await FindVendor(user._id);
		if(existingUser!==null)
		{
			existingUser.serviceAvailable=!existingUser.serviceAvailable;
			const savedResult=await existingUser.save();
			return res.json(savedResult);
		}
	}
};
