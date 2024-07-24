import { Router, Response, NextFunction,Request  } from "express"
import express from 'express';

const router =express.Router();
router.get('/',(req:Request,res:Response)=>{
    res.send('Admin Page');
});

export {router as VandorRoutes};
