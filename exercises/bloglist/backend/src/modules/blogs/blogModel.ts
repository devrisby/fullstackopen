import mongoose, { Schema } from 'mongoose'
import { modelFactory } from '../../data/utils'
import { IBlog } from './blogType'

const blogSchema = new Schema<IBlog>({
    title: String,
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const BlogModel = modelFactory<IBlog>('Blog', blogSchema)

export default BlogModel