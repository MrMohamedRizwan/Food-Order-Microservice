import { Request, Response } from "express";
import express from "express";
import { CreateVandorInput } from "../dto";
import { Vendor } from "../models";
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
	const createVendor = Vendor.create({
		name: name,
		salt: "bhugu",
		address: address,
		pincode: pincode,
		foodType: foodType,
		email: email,
		password: password,
		ownerName: ownerName,
		phone: phone,
		rating: 0,
		serviceAvailable: true,
		coverImages: [],
	});
	res.json({
		createVendor,
	});
};

export const getVedors = async (req: Request, res: Response) => {
	res.json({ message: "Vandor Created" });
};

export const getVedorsbyId = async (req: Request, res: Response) => {
	res.json({ message: "Vandor Created" });
};
