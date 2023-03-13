import type { RequestHandler } from 'express'
import * as UserService from '../users/userService'
import * as AuthService from './auth.service'
import * as config from '../../common/config'
import ApiError from '../../http/error'
import UserModel from '../users/userModel'

const authenticateUser: RequestHandler = async (req: any, res, next) => {
    try {
        const payload = AuthService.decryptToken(req.get('authorization'), config.JWT_SECRET)
        
        if(!(payload.username && payload.id))
            throw new Error('Missing or invalid JWT token')

        const user = await UserService.getById(payload.id)
        
        req.user = user
        next()
    } catch (err) {
        // todo: handle jwt expiration error
        next(new ApiError(401, "Please log in to access page"))
    }
}

export default {
    authenticateUser
}