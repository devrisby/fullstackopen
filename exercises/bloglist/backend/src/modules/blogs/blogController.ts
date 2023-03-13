import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import ApiError from '../../http/error'
import UserModel from '../users/userModel'
import BlogModel from "./blogModel"
import { IBlog } from './blogType'
import AuthMiddleware from '../auth/auth.middleware'

const router = express.Router()

router.get('/', AuthMiddleware.authenticateUser, async (request, response) => {
  const blogs = await BlogModel.find({}).populate('user', {username: 1, name: 1}).exec()
  response.status(200).json(blogs)
})
  
router.post('/', AuthMiddleware.authenticateUser, async (request: Request| any, response: Response) => {
  
  if(!request.body.title || !request.body.url ) {
    throw new ApiError(400, "Invalid data: Missing title or url")
  }

  const user = request.user

  const blog = new BlogModel({
    title: request.body.title,
    author: request.user.username,
    url: request.body.url,
    likes: request.body.likes,
    user: request.user.id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id as mongoose.Schema.Types.ObjectId)

  await user.save()

  response.status(201).json(savedBlog)
})

router.put('/:id', async (request: Request, response: Response) => {
  if(!request.params.id || !mongoose.Types.ObjectId.isValid(request.params.id))
    throw new ApiError(400, "Invalid data: Incorrect ID")
  
    if(!request.body.title || !request.body.url) {
      throw new ApiError(400, "Invalid data: Missing title or url")
    }

    const blog: IBlog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(request.params.id, blog, {new: true })

    if(updatedBlog == null) {
      throw new ApiError(404, 'Blog not found')
    }

    response.status(201).json(updatedBlog)
})

router.delete("/:id", async (request: Request, response: Response) => {
  if(!request.params.id || !mongoose.Types.ObjectId.isValid(request.params.id))
    throw new ApiError(400, "Invalid data: Incorrect ID")

  await BlogModel.findByIdAndDelete(request.params.id).exec()

  response.status(204).end()

})

export default router