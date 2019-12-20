import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

/* HOOKS */
import { useField } from '../hooks/index'

import {
    likeBlog,
    removeBlog,
    addComment
} from '../reducers/blogReducer'

import { setNotification } from '../reducers/notificationReducer'
import { Card, Icon, Button, Divider, Header, Form, List } from 'semantic-ui-react'

const BlogNoHistory = (props) => {

    // Custom hook
    const comment = useField('text')

    const { reset: resetComment, ...commentProps } = comment

    if (props.blogData === undefined) {
        return null
    }

    let blog = props.blogData

    const commentHandler = async (event) => {
        event.preventDefault()

        try {
            // Get new comment
            let newComment = event.target.comment.value

            // Send comment
            props.addComment(newComment, blog)

        } catch (exception) {
            // If not, show an error
            props.setNotification('Wrong credentials. Try again.', 'negative', 5)
        }

        // Clean input using custom hook
        resetComment()
    }

    const likeHandler = (blog) => {

        props.likeBlog(blog)

        let notificationMsg = `The blog ${blog.title} was liked`
        props.setNotification(notificationMsg, 'positive', 5)
    }

    const removeHandler = (blog) => {

        if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
            // Call the blogReducer method
            props.removeBlog(blog)

            // Go home (withRouter functionality)
            props.history.push('/')

            // Set notification
            let notificationMsg = `The blog ${blog.title} was deleted`
            props.setNotification(notificationMsg, 'negative', 5)
        }

        return 0
    }

    return (
        <>
            <Card>
                <Card.Content>
                    <Card.Header>{blog.title}</Card.Header>
                    <Card.Meta>Added by {blog.author}</Card.Meta>
                    {blog.url === ''
                        ? 'No url provided'
                        : <Card.Content extra>
                            <Icon name='linkify' /> {blog.url}
                        </Card.Content>
                    }
                    <Divider />
                    <Card.Content extra>
                        <Button
                            content="Like"
                            labelPosition='right'
                            icon="heart"
                            label={{ as: 'a', basic: true, content: blog.likes }}
                            onClick={() => likeHandler(blog)}
                        >
                        </Button>
                        <Button
                            basic
                            color='red'
                            icon='trash'
                            onClick={() => removeHandler(blog)}
                        />
                    </Card.Content>
                </Card.Content>
            </Card>
            <Divider />
            <>
                <Header as="h4">Comments</Header>
                {blog.comments.length === 0
                    ? 'This blog has no comments yet'
                    :
                    <List divided animated >
                        {blog.comments.map(c =>
                            <List.Item key={c}>
                                {c}
                            </List.Item>
                        )}
                    </List>
                }
                <Form onSubmit={commentHandler}>
                    <Form.Input
                        name="comment"
                        width={4}
                        placeholder="Great post!"
                        {...commentProps}
                        data-cy="comment-input"
                    />
                    <Button type="submit">Add comment</Button>
                </Form>
            </>
        </>
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
    addComment,
    setNotification
}

const Blog = withRouter(BlogNoHistory)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog)