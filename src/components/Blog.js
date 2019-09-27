import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, deleteBlog, currentUser }) => {
    const blogStyle = {
        padding: 7,
        border: 'solid',
        borderColor: 'cornflowerblue',
        borderWidth: 4,
        borderRadius: 10,
        marginBottom: 5
    }

    const [expanded, setExpanded] = useState(false)

    const showExpanded = () => {
        setExpanded(!expanded)
    }

    const confirmDeletion = () => {

        if(window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            deleteBlog(blog.id, blog.title)
        }
        return 0
    }

    return (
        <div id={'blog'} style={blogStyle}>
            {expanded === false ?
                <div onClick={showExpanded}>
                    {blog.title} - {blog.author}
                </div>
                :
                <div>
                    <button onClick={showExpanded}>Collapse</button>
                    <ul>
                        <li>{blog.title}</li>
                        <li>{blog.url === '' ? 'No url provided' : blog.url}</li>
                        <li>{blog.likes} <button onClick={() => handleLikes(blog.id, blog.likes)}>Like</button></li>
                        <li>Added by {blog.author}</li>
                    </ul>

                    {/* deleteBlog */}
                    {currentUser.username === blog.user.username
                        ? <button onClick={confirmDeletion}>Remove</button>
                        : null
                    }
                </div>}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLikes: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired
}

export default Blog