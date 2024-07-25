import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { VandorPayload } from "../dto";
import { AuthPayload } from "../dto/Auth.dto";
import { Request } from "express";
export const generateSalt = async () => {
	return await bcrypt.genSalt(10);
};

export const GenerateHash = async (password: string, salt: string) => {
	return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
	enteredPassword: string,
	savePassword: string,
	hash: string,
) => {
	const pwd = await GenerateHash(enteredPassword, hash);
	if (pwd === savePassword) {
		return true;
	} else {
		return false;
	}
};

export const GenerateSignature = async (payload: VandorPayload) => {
	const secretKey = process.env.JWT_SECRET_KEY;

	if (!secretKey) {
		throw new Error("JWT_SECRET_KEY is not defined");
	}
	console.log(secretKey);
	const signature = await jwt.sign(payload, secretKey, { expiresIn: "30m" });
	return signature;
};

export const ValidSignature = async (req: Request) => {
	const sigunature = req.get("Authorization");
	console.log(sigunature);
	const secretKey = process.env.JWT_SECRET_KEY;
	if (!secretKey) {
		throw new Error("JWT_SECRET_KEY is not defined");
	}
    if(!sigunature)
        return false;
    try
	{const payload = (await jwt.verify(
			sigunature.split(" ")[1],
			secretKey,
		)) as AuthPayload;
		req.user = payload;
		return true;
    }
    catch(e)
    {
        return false;
    }
	 
};
