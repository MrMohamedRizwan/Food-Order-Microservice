import express from 'express';
import dotenv from 'dotenv';
import {AdminRoutes,VandorRoutes} from './routes';
import bodyParser from 'body-parser';
import { connectToDB } from './config/db';

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

app.use('/admin',AdminRoutes);
app.use("/vandor",VandorRoutes);
app.listen(process.env.PORT,()=>{
    console.clear()
    console.log('Server is running on port 3000');
});