import React from 'react'
import Blog from './Blog'

// Generate a new Blog element for each blog
const BlogList = ({ blogsToShow, handleLikes, deleteBlog }) => {
    
    return (
        blogsToShow.map(blog => 
            <Blog
                key={blog.id}
                blog={blog}
                handleLikes={handleLikes}
                deleteBlog={deleteBlog}
            />
        )
    )
}

export default BlogList;