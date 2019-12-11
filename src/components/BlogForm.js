import React from 'react'
import { connect } from "react-redux";

import { createBlog } from "../reducers/blogReducer";
import { setNotification } from '../reducers/notificationReducer'

import { useField } from "../hooks/index";

const BlogForm = (props) => {

    const blogTitle = useField('text')
    const blogAuthor = useField('text')
    const blogUrl = useField('text')

    const addBlog = async (event) => {
        // Prevent page reloading
        event.preventDefault()

        // Create new blog object
        const blogObject = {
            title: blogTitle.value,
            author: blogAuthor.value,
            url: blogUrl.value,
            user: props.currentUser.id
        }

        props.createBlog(blogObject)
        
        let notificationMsg = `A new blog "${blogObject.title}" was created`

        props.setNotification(
            notificationMsg,
            'success',
            5
        )

        /* setBlogs(blogs.concat(createdBlog)) */

        // Use custom hook functionality to reset state
        blogTitle.reset()
        blogAuthor.reset()
        blogUrl.reset()

    }
    /**
     * Toma el valor de `reset` dentro de `title` y lo guarda en `resetTitle`
     * Las demas propiedades de `title` son pasadas a `titleProps`
     * */
    const { reset: resetTitle, ...titleProps } = blogTitle
    const { reset: resetAuthor, ...authorProps } = blogAuthor
    const { reset: resetUrl, ...urlProps } = blogUrl

    return (
        <>
            <h2>Create new blog post</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input name="title" {...titleProps} />
                </div>
                <div>
                    Author:
                    <input name="author" {...authorProps}  />
                </div>
                <div>
                    URL:
                    <input name="url" {...urlProps} />
                </div>
                <button type="submit">Create</button>
            </form>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user
    }
}

const mapDispatchToProps = {
    createBlog,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogForm)