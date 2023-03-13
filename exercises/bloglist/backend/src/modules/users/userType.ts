import mongoose from 'mongoose'
import { IBlog } from '../blogs/blogType';

export interface IUser {
    _id?: mongoose.Schema.Types.ObjectId | string;
    id?: mongoose.Schema.Types.ObjectId | string;
    __v?: number;
    username: string,
    name: string,
    password?: string,
    blogs: mongoose.Schema.Types.ObjectId[]
}