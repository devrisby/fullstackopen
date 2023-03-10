import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import ApiError from '../../http/error'
import BlogModel from "./blogModel"
import { IBlog } from './blogType'

const router = express.Router()

router.get('/', async (request, response) => {
  const blogs = await BlogModel.find({})
  response.status(200).json(blogs)
})
  
router.post('/', async (request: Request, response: Response) => {
  
  if(!request.body.title || !request.body.url) {
    throw new ApiError(400, "Invalid data: Missing title or url")
  }

  const blog = new BlogModel({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  })

  const savedBlog = await blog.save()

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

  await BlogModel.findByIdAndDelete(request.params.id)

  response.status(204).end()

})

export default router