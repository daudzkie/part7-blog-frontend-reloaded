import React from 'react'
import { connect } from "react-redux";
import Blog from './Blog'

import { likeBlog } from '../reducers/blogReducer'
import { removeBlog } from '../reducers/blogReducer'
import { filterChange } from "../reducers/filterReducer"


const BlogList = (props) => {

    console.log('BlogList props', props)
    const likeHandler = (blog) => {
        props.likeBlog(blog)
    }

    const removeHandler = (blog) => {
        props.removeBlog(blog)
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
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLikes={() => likeHandler(blog)}
                    deleteBlog={() => removeHandler(blog)}
                    currentUser={props.currentUser}
                />
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
        currentUser : state.user
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