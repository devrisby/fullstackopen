import { IBlog } from "../modules/blogs/blogType";

const dummy = (blogs: IBlog[]) => {
    return 1;
}

const countLikes = (blogs: IBlog[]) => blogs.map(b => b.likes).reduce((prev, cur) => prev + cur)

// https://stackoverflow.com/a/53654364
const findBlogWithMostLikes = (blogs: IBlog[]) => blogs.reduce((prev, cur) => prev.likes > cur.likes ? prev: cur)

const findAuthorWithMostBlogs = (blogs: IBlog[]) => {
    const authors = new Map()
    
    for(const b of blogs) {
        if(authors.has(b.author)) {
            authors.set(b.author, authors.get(b.author)+1)
        } else {
            authors.set(b.author, 1)
        }
    }

    const authorWithMostBlogs = [...authors.entries()].reduce((prev, cur) => prev[1] > cur[1]? prev: cur)

    return {
        author: authorWithMostBlogs[0],
        blogs: authorWithMostBlogs[1]
    }
}

const findAuthorWithMostLikes = (blogs: IBlog[]) => {
    const authors = new Map()
    
    for(const b of blogs) {
        if(authors.has(b.author)) {
            authors.set(b.author, authors.get(b.author)+b.likes)
        } else {
            authors.set(b.author, b.likes)
        }
    }

    const authorWithMostLikes = [...authors.entries()].reduce((prev, cur) => prev[1] > cur[1]? prev: cur)

    return {
        author: authorWithMostLikes[0],
        likes: authorWithMostLikes[1]
    }
}

export default {
    dummy,
    countLikes,
    findBlogWithMostLikes,
    findAuthorWithMostBlogs,
    findAuthorWithMostLikes
}