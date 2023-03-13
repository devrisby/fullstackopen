import supertest from 'supertest'
import bcrypt from 'bcrypt'

import app from '../http/app'
import { startDb } from '../data/db'
import * as config from '../common/config'
import UserModel from '../modules/users/userModel'
import * as UserService from '../modules/users/userService'
import { IUser } from '../modules/users/userType'

const api = supertest(app)

beforeAll(async () => await startDb(config.getMongoUri()!))

describe('When there is initially one user in db', () => {
    beforeEach(async () => {
        await UserModel.deleteMany({})

        const password = await bcrypt.hash('dummy password', 10)
        const user = new UserModel({username: 'dummy', password})

        await user.save()
    })

    test('New user is created', async () => {
        const initialUsers = await UserService.getAll()

        const testUser: IUser = {
            username: 'Test username',
            name: 'Test name',
            password: 'Test password',
            blogs: []
        }

        await api.post('/api/users').send(testUser).expect(201).expect('Content-Type', /application\/json/)

        const usersAfterAdd = await UserService.getAll()

        expect(usersAfterAdd).toHaveLength(initialUsers.length + 1)

        const usernames = usersAfterAdd.map(u => u.username)
        expect(usernames).toContain(testUser.username)
    })

    test('New user is not created if username is already taken', async () => {
        const initialUsers = await UserService.getAll()

        const testUser: IUser = {
            username: 'dummy',
            name: 'Test name',
            password: 'Test password',
            blogs: []
        }

        const result = await api
          .post('/api/users')
          .send(testUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
        
        expect(result.body.cause).toContain('expected username to be unique')

        const usersAfterAdd = await UserService.getAll()

        expect(usersAfterAdd).toEqual(initialUsers)
    })
})