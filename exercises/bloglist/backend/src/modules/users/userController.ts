import express, { Request, Response } from 'express'
import ApiError from '../../http/error'
import * as UserService from './userService'

const router = express.Router()

router.get("/", async (request, response) => {
    const users = await UserService.getAll()
    response.json(users)
})

router.post('/', async (request, response) => {
    const { username, name, password } = request.body

    try {
        const savedUser = await UserService.create(username, name, password)
        response.status(201).json(savedUser)
    } catch (e) {
        console.log("POST error:",e)
        if(e instanceof Error && e.message === 'expected username to be unique')
            throw new ApiError(400, e.message)
        
        throw e
    }
})

export default router