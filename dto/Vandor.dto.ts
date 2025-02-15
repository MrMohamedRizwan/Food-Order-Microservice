export interface CreateVandorInput{
    name: string;
    ownerName: string;
    foodType: [string];
    pincode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface EditVandorInput{
    name:string;
    address:string;
    phone:string;
    foodType:[string];
}

export interface VandorLogiInput{
    email: string;
    password: string;
}

export interface VandorPayload{
    _id:string;
    email:string;
    name:string;
    foodtypes:[string];
}