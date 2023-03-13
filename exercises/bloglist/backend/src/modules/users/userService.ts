import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import UserModel from './userModel'
import { IUser } from './userType'

const create = async (username: string, name: string, password: string) => {
    const saltRounds = 10
    const passwordHashed = await bcrypt.hash(password!, saltRounds)

    const existingUser = await UserModel.findOne({username: username}).exec()

    if(existingUser) {
        console.log("existing user", existingUser)
        throw new Error("expected username to be unique")
    }

    await UserModel.init();

    const user = new UserModel({
        username,
        name,
        password: passwordHashed
    })

    try {
        const savedUser = await user.save();
        return savedUser
    } catch (err:any) {
        if (err.name === 'MongoError' && err.code === 11000) {
            console.log("Failed index check!")
            throw new Error("expected username to be unique")
        }
    }
}

const getAll = () => {
    return UserModel.find({}).populate('blogs', {title: 1, url: 1, likes: 1}).exec()
}

const getByUsername = (username: string) => UserModel.findOne({ username }).exec()

const getById = (id: string | mongoose.Schema.Types.ObjectId) => UserModel.findById(id).exec()

export {
    create,
    getAll,
    getByUsername,
    getById
}