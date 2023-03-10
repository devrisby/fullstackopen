import listHelper from '../utils/list_helper'
import blogsData from './blogsData'

test('dummy returns one', () => {
    const blogs: any[] = []

    const res = listHelper.dummy(blogs)
    expect(res).toBe(1)
})

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
        const singleBlog = [blogsData[0]]
        const res = listHelper.countLikes(singleBlog)
        expect(res).toBe(7)
    })

    test('when list has only multiple blogs, equals the likes of all the blogs', () => {
        const res = listHelper.countLikes(blogsData)
        expect(res).toBe(36)
    })
})

describe('most likes', () => {
    test('when list has only one blog, return the blog', () => {
        const singleBlog = [blogsData[0]]
        const res = listHelper.findBlogWithMostLikes(singleBlog)
        expect(res).toEqual(singleBlog[0])
    })

    test('when list has only multiple blogs, return blog with most likes', () => {
        const res = listHelper.findBlogWithMostLikes(blogsData)
        expect(res).toEqual(blogsData[2])
    })
})

describe('most blogs', () => {
    test('when list has only one blog, return that blogs author', () => {
        const singleBlog = [blogsData[0]]
        const res = listHelper.findAuthorWithMostBlogs(singleBlog)
        expect(res).toEqual({author: singleBlog[0].author, blogs: 1})
    })

    test('when list has only multiple blogs, return author with most blogs', () => {
        const res = listHelper.findAuthorWithMostBlogs(blogsData)
        expect(res).toEqual({author: 'Robert C. Martin', blogs: 3})
    })
})

describe('most liked blogs', () => {
    test('when list has only one blog, return that blogs author', () => {
        const singleBlog = [blogsData[0]]
        const res = listHelper.findAuthorWithMostLikes(singleBlog)
        expect(res).toEqual({author: singleBlog[0].author, likes: singleBlog[0].likes})
    })

    test('when list has only multiple blogs, return author with most likes', () => {
        const res = listHelper.findAuthorWithMostLikes(blogsData)
        expect(res).toEqual({author: 'Edsger W. Dijkstra', likes: 17})
    })
})