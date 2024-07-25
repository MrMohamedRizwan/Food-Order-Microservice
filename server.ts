import express from 'express';
import dotenv from 'dotenv';
import {AdminRoutes,VandorRoutes} from './routes';
import bodyParser from 'body-parser';
import { connectToDB } from './config/db';
import path from "path"
import fs from "fs"
const morgan = require("morgan");

dotenv.config();
connectToDB();
const app=express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.send('Hello World');
});
const imagesDir = path.join(__dirname, "../images");

if (!fs.existsSync(imagesDir)) {
	fs.mkdirSync(imagesDir, { recursive: true });
}

app.use("/images", express.static(imagesDir));

app.use('/admin',AdminRoutes);
app.use("/vandor",VandorRoutes);
app.listen(process.env.PORT,()=>{
    console.clear()
    console.log('Server is running on port 3000');
});