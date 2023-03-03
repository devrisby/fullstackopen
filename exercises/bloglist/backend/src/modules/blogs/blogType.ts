import mongoose from "mongoose";

export interface IBlog {
    _id?: mongoose.Schema.Types.ObjectId | string;
    title: string;
    author: string;
    url: string;
    likes: number;
    __v?: number;
}