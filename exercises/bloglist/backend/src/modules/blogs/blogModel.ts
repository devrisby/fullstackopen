import { Schema } from 'mongoose'
import { modelFactory } from '../../data/utils'
import { IBlog } from './blogType'

const blogSchema = new Schema<IBlog>({
    title: String,
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0
    }
})

const BlogModel = modelFactory<IBlog>('Blog', blogSchema)

export default BlogModel