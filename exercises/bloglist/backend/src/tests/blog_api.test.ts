import supertest from 'supertest'

import * as config from '../common/config'
import {startDb, stopDb } from '../data/db'
import app from '../http/app'
import BlogModel from '../modules/blogs/blogModel'
import { IBlog } from '../modules/blogs/blogType'
import data from "./blogsData"

const api = supertest(app)

beforeAll(async () => await startDb(config.getMongoUri()!))

beforeEach(async () => {
    await BlogModel.deleteMany({})
    const blogDocuments = data.map(blog => new BlogModel(blog))
    await BlogModel.bulkSave(blogDocuments)
})

describe('retrieving blogs', () => {
    test('blog posts are returned as json', async () => {
        await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }, 100000)
    
    test('correct number of blog posts are returned', async () => {
        const response = await api.get('/api/blogs').expect(200)
    
        expect(response.body as IBlog[]).toHaveLength(data.length)
    }, 100000)
    
    test('blog post contains the id property', async () => {
        const response = await api.get('/api/blogs').expect(200)
        const blogs = response.body as IBlog[]
    
        blogs.forEach(blog => expect(blog.id).toBeDefined())
    }, 100000)
})

describe('creating new blog', () => {
    test('New blog is created', async () => {
        const newBlog:IBlog = {
            title: "test blog",
            author: "test author",
            url: "test url",
            likes: 0
        }
    
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const blogs = await BlogModel.find({})
        expect(blogs).toHaveLength(data.length + 1)
    
        const blogTitles = blogs.map(blog => blog.title)
        expect(blogTitles).toContain('test blog')
    
    }, 100000)
    
    test('New blog without likes is created with 0 likes', async () => {
        const newBlog = {
            title: "test blog",
            author: "test author",
            url: "test url",
        }
    
        const response = await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        expect(response.body.likes).toBe(0)
    
    }, 100000)
    
    test('New blog without title causes 400', async () => {
        const newBlog = {
            author: "test author",
            url: "test url",
        }
    
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    }, 100000)
    
    test('New blog without url causes 400', async () => {
        const newBlog = {
            title: "test blog",
            author: "test author",
        }
    
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    }, 100000)
})

describe('updating blog', () => {
    test('Existing blog\'s title is updated', async () => {
        const response = await api.get('/api/blogs')
        const blog = (response.body)[0] as IBlog

        blog.title = "new title"

        const response2 = await api.put('/api/blogs/' + blog.id)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        expect(response2.body.title).toBe('new title')
    }, 100000)
})

describe('removing blog', () => {
    test('Existing blog is removed', async () => {
        const response = await api.get('/api/blogs').expect(200)
        const blogs = response.body as IBlog[]
        const blog = blogs[0]

        await api.delete('/api/blogs/' + blog.id).expect(204)

        const response2 = await api.get('/api/blogs').expect(200)
        const blogsAfterDeletion = response2.body as IBlog[]

        expect(blogsAfterDeletion).toHaveLength(blogs.length - 1)
    })
})



afterAll(async () => {
    await stopDb()
})
