import express, { Request, Response } from 'express'
import ApiError from '../../http/error'
import * as config from '../../common/config'


import * as UserService from '../users/userService'
import * as AuthService from './auth.service'

const router = express.Router()

router.post("/login", async (request, response) => {
    const { username, password } = request.body

    const user = await UserService.getByUsername(username)
    if(user === null) throw new ApiError(401, 'invalid username or password')


    if(!(await AuthService.passwordMatches(password, user.password!))) {
        throw new ApiError(401, 'invalid username or password')
    }
    
    const token = AuthService.generateJWT({username: user.username, id: user._id}, config.JWT_SECRET)

    response.status(200).json({token, user})
})

export default router