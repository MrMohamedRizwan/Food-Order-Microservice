import { Request, Response } from "express";
import express from "express";
import { CreateVandorInput } from "../dto";
import { Vendor } from "../models";
import { GenerateHash, generateSalt } from "../utility";
export const FindVendor = async (id: String | undefined, email?: string) => {
	if (email) {
		return await Vendor.findOne({ email: email });
	} else {
		return await Vendor.findById(id);
	}
};

export const createVandor = async (req: Request, res: Response) => {
	const {
		name,
		address,
		pincode,
		foodType,
		email,
		password,
		ownerName,
		phone,
	} = <CreateVandorInput>req.body;
	const existingVandor = await FindVendor("", email);

	if (existingVandor !== null) {
		return res
			.status(403)
			.json({ message: "A vandor is exist with this email ID" });
	}
	const satlt = await generateSalt();
	const hashedPassword = await GenerateHash(password, satlt);
	try {
		const createVendor = await Vendor.create({
			name: name,
			salt: satlt,
			address: address,
			pincode: pincode,
			foodType: foodType,
			email: email,
			password: hashedPassword,
			ownerName: ownerName,
			phone: phone,
			rating: 0,
			serviceAvailable: true,
			coverImages: [],
			foods: [],
		});
		res.json(createVendor);
	} catch (e) {
		res.json({ message: e });
	}
};

export const getVedors = async (req: Request, res: Response) => {
	const vendors = await Vendor.find({});
	if (vendors.length > 0) {
		res.json(vendors);
	} else {
		res.json({ message: "No Vandors Found" });
	}
};

export const getVedorsbyId = async (req: Request, res: Response) => {
	const id = req.params.id;
	const vendor = await FindVendor(id);
	if (vendor) {
		res.json(vendor);
	} else {
		res.json({ message: "No Vandor Found" });
	}
};
