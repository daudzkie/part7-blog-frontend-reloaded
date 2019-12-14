import React from 'react'
import { connect } from "react-redux";

import { likeBlog } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/blogReducer'
import { setNotification } from "../reducers/notificationReducer";

const Blog = (props) => {

    if (props.blogData === undefined) {
        return null
    }

    let blog = props.blogData
    
    const likeHandler = (blog) => {

        props.likeBlog(blog)

        let notificationMsg = `The blog ${blog.title} was liked`
        props.setNotification(notificationMsg, 'success', 5)
    }

    const removeHandler = (blog) => {
        
        if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            props.removeBlog(blog)

            let notificationMsg = `The blog ${blog.title} was deleted`
            props.setNotification(notificationMsg, 'error', 5)
        }
        return 0
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <ul>
                <li>
                    {blog.url === ''
                        ? 'No url provided'
                        : <a href={blog.url}>{blog.url}</a>}
                    
                </li>
                <li>{blog.likes} <button onClick={() => likeHandler(blog)}>Like</button></li>
                <li>Added by {blog.author}</li>
                <button style={{backgroundColor: 'red'}} onClick={() => removeHandler(blog)}>Delete</button>
            </ul>

            <h4>Comments</h4>
            {console.log(blog.comments)}
            {blog.comments.length === 0
                ? 'This blog has no comments yet'
                : 
                    <ul>
                        {blog.comments.map(c => 
                        <li key={c}>{c}</li>)}
                    </ul>
            }
        </div>
    )
}

/**
 * The function can be used for defining the props of the
 * connected component that are based on the state of the Redux store.
 * @param state
 */
const mapStateToProps = (state, ownProps) => {

    const blogId = ownProps.id

    const blogData = state.blogs.find(b => b.id === blogId)

    return { blogData }
}

/**
 * Group of action creator functions passed to the connected component as props
 */
const mapDispatchToProps = {
    likeBlog,
    removeBlog,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog)