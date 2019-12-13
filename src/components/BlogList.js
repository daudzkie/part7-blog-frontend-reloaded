import React from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { likeBlog } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/blogReducer'
import { filterChange } from "../reducers/filterReducer"
import { setNotification } from "../reducers/notificationReducer";

const BlogList = (props) => {

    const blogStyle = {
        padding: 7,
        border: 'solid',
        borderColor: 'cornflowerblue',
        borderWidth: 4,
        borderRadius: 10,
        marginBottom: 5
    }

    

    return (
        <>
            <div style={({ marginBottom: 10 })}>
                <h3>Blogs</h3>
                <h5>Order by</h5>
                Most liked
                <input
                    type="radio"
                    name="filter"
                    onChange={() => props.filterChange('LIKES')}
                />
                Creation Order
                <input
                    type="radio"
                    name="filter"
                    onChange={() => props.filterChange('CREATED')}
                />
            </div>
            
            {/* Generate a new Blog element for each blog */}
            {props.visibleBlogs.map(blog =>
                <div key={blog.id} id={'blog'} style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
                </div>
            )}
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
    filterChange,
    setNotification
}

// we can export directly the component returned by connect
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogList)