import mongoose, { Schema, Document, Model } from 'mongoose';

interface FoodDoc extends Document
{
    VandorId:string;
    name:string;
    description:string;
    category:string;
    foodType:string;
    readytime:number,
    price:number;
    rating:number;
    images:[string]
}

const FoodSchema=new Schema({
    VandorId:{ type: String, required: true},
    name:{ type: String, required: true},
    description:{ type: String, required: true},
    category:{ type: String, required: true},
    foodType:{ type: String, required: true},
    readytime:{ type: Number},
    price:{ type: Number, required: true},
    rating:{ type: Number},
    images:{ type: [String]},
},{
    toJSON:{
        transform(doc,ret){
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
})

const Food=mongoose.model<FoodDoc>('food',FoodSchema);

export {Food};