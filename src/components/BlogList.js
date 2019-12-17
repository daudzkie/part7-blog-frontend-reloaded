import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { likeBlog } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/blogReducer'
import { filterChange } from '../reducers/filterReducer'
import { Header, Form, Item } from 'semantic-ui-react'

const BlogList = (props) => {

    return (
        <>
                <Header as="h4" dividing>
                    Order by
                </Header>
                <Form>
                    <Form.Radio
                        label="Creation Order"
                        checked={props.filter === 'CREATED'}
                        name="filter"
                        onChange={() => props.filterChange('CREATED')}
                    />
                    <Form.Radio
                        label="Most liked"
                        name="filter"
                        checked={props.filter === 'LIKES'}
                        onChange={() => props.filterChange('LIKES')}
                    />
                </Form>

            {/* Generate a new Blog element for each blog */}
            <Item.Group divided>
                {props.visibleBlogs.map(blog =>
                    <Item key={blog.id} id={'blog'} as={Link} to={`/blogs/${blog.id}`}>
                        <Item.Header>{blog.title}</Item.Header>
                    </Item>
                )}
            </Item.Group>

        </>
    )
}

/**
 * Si `filter` === `LIKES`, `blogsToShow` contendrá los blogs por cantidad de likes.
 * Si no contendrá los blogs ordenados normalmente.
 */
const blogsToShow = ({ blogs, filter }) => {

    if (filter === 'LIKES') {
        // Do not mutate data
        // Create a new array with the current blogs
        let blogsToSort = Array.from(blogs)

        return blogsToSort.sort((a, b) => b.likes - a.likes)
    }

    // Return in creation order (Original)
    return blogs
}

/**
 * The function can be used for defining the props of the
 * connected component that are based on the state of the Redux store.
 * @param state
 */
const mapStateToProps = (state) => {
    return {
        visibleBlogs: blogsToShow(state),
        filter: state.filter,
        currentUser: state.users.currentUser,
        notifications: state.notifications
    }
}

/**
 * Group of action creator functions passed to the connected component as props
 */
const mapDispatchToProps = {
    likeBlog,
    removeBlog,
    filterChange
}

// we can export directly the component returned by connect
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogList)