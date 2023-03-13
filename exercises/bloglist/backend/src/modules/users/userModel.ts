import mongoose, { Schema } from 'mongoose'
import { modelFactory } from '../../data/utils'
import { IUser } from './userType'

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
    },
    name: String,
    password: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

const UserModel = modelFactory<IUser>('User', userSchema, ['password'])

export default UserModel