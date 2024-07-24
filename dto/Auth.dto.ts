import { NextFunction, Request, Response } from 'express';
import { VandorPayload } from './Vandor.dto';
import { ValidSignature } from '../utility';
export type AuthPayload = VandorPayload;

