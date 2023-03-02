import express, { Request, Response } from 'express'
import BlogModel from "./blogModel"

const router = express.Router()

router.get('/', (request, response) => {
    BlogModel
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
router.post('/', (request: Request, response: Response) => {
    const blog = new BlogModel(request.body)

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
    })
})

export default router