import React from 'react'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { useField } from '../hooks/index'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = (props) => {

    const blogTitle = useField('text')
    const blogAuthor = useField('text')
    const blogUrl = useField('text')

    /**
     * Toma el valor de `reset` dentro de `title` y lo guarda en `resetTitle`
     * Las demas propiedades de `title` son pasadas a `titleProps`
     * */
    const { reset: resetTitle, ...titleProps } = blogTitle
    const { reset: resetAuthor, ...authorProps } = blogAuthor
    const { reset: resetUrl, ...urlProps } = blogUrl

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
            'positive',
            5
        )

        /* setBlogs(blogs.concat(createdBlog)) */

        // Use custom hook functionality to reset state
        resetTitle()
        resetAuthor()
        resetUrl()
    }


    return (
        <>
        <h4>Create a new blog post</h4>
            <Form onSubmit={addBlog} size="small" >
                <Form.Input
                    label="Title"
                    name="title"
                    width={4}
                    {...titleProps}
                    data-cy='title-input'
                />
                <Form.Input
                    label="Author"
                    name="author"
                    width={4}
                    {...authorProps}
                    data-cy='author-input'
                />
                <Form.Input
                    label="URL"
                    name="url"
                    width={4}
                    {...urlProps}
                    data-cy='url-input'
                />
                <Button positive type="submit" data-cy='blog-submit'>Create</Button>
            </Form>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
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