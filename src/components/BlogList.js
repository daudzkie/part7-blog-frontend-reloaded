import React from 'react'
import Blog from './Blog'

// Generate a new Blog element for each blog
const BlogList = ({ blogsToShow, handleLikes }) => {
    
    return (
        blogsToShow.map(blog => 
            <Blog
            key={blog.id}
            blog={blog}
            handleLikes={handleLikes}
            />
        )
    )
}

export default BlogList;