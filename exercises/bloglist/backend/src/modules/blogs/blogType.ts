import mongoose from "mongoose";
import { IUser } from "../users/userType";

export interface IBlog {
    _id?: mongoose.Schema.Types.ObjectId | string;
    id?: mongoose.Schema.Types.ObjectId | string;
    title: string;
    author: string;
    url: string;
    likes: number;
    __v?: number;
    user?: IUser
}