import React from 'react'
import Blog from './Blog'

// Generate a new Blog element for each blog
const BlogList = ({ blogsToShow, handleLikes, deleteBlog, currentUser }) => {
    
    return (
        blogsToShow.map(blog => 
            <Blog
                key={blog.id}
                blog={blog}
                handleLikes={handleLikes}
                deleteBlog={deleteBlog}
                currentUser={currentUser}
            />
        )
    )
}

export default BlogList;