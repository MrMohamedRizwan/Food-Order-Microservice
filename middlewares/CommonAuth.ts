import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto";
import { ValidSignature } from "../utility";

declare global {
	namespace Express {
		interface Request {
			user?: AuthPayload;
		}
	}
}
export const Authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const validate = await ValidSignature(req);
	// console.log(validate)
	if (validate) {
		next();
	} else {
		return res.status(403).json({ message: "Unauthorize Access" });
	}
};
