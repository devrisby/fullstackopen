import jwt, { JwtPayload } from "jsonwebtoken"
import brcypt from "bcrypt"
import mongoose from "mongoose";

interface TokenPayload extends JwtPayload {
    username: string;
    id: mongoose.Schema.Types.ObjectId | string
} 

const generateJWT = (payload: TokenPayload, secret: string) => jwt.sign(payload, secret)
const passwordMatches = (rawPassword: string, storedPassword: string) => brcypt.compare(rawPassword, storedPassword)
const decryptToken = (authHeaderToken: string, secret: string) => {
    if(!(authHeaderToken && authHeaderToken.startsWith('Bearer ')))
        throw new Error('Missing or invalid JWT token')
    
    const token = authHeaderToken.replace('Bearer ', '')

    return jwt.verify(token, secret) as TokenPayload
}

export {
    generateJWT,
    passwordMatches,
    decryptToken,
    TokenPayload
}