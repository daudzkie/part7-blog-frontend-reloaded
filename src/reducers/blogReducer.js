import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            // Return an array with the state plus the action
            return [...state, action.data]
        case 'LIKE':
            // Extract blog id
            const id = action.data.id

            // Find blog to change
            const blogToLike = state.find(b => b.id === id)

            // Create a copy of blogToLike and add 1 like
            const likedBlog = {
                ...blogToLike,
                likes: blogToLike.likes + 1
            }

            /* Replace the state with all the 
            blogs not changed and the created one */
            const blogsToSort = state.map(blog =>
                blog.id !== id ? blog : likedBlog
            )

            // Return the blogs sorted by most likes
            return blogsToSort.sort((a, b) => b.likes - a.likes)
        case 'REMOVE':
            /* Actualiza los posts a renderizar
              excluyendo al que coincide con el
              id recientemente eliminado. */
              console.log('REMOVE BLOG')
        default:
            return state
    }
}

/* ACTION CREATORS */

export const initializeBlogs = () => {
    return async dispatch => {

        // The operation first fetches all the blogs from the server
        const blogs = await blogService.getAll()

        // Then dispatches the blogs to the action, which adds them to the store.
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = blogObject => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const likeBlog = blog => {
    return async dispatch => {

        // Send the PUT request through the blogService
        const likedBlog = await blogService.update(blog.id, blog.likes)
        dispatch({
            type: 'LIKE',
            data: likedBlog
        })
    }
}

export const removeBlog = blog => {
    return async dispatch => {

        // Utiliza el blogService para enviar una DELETE request
        const deletedBlog = await blogService.deleteBlog(blog.id)
        dispatch({
            type: 'REMOVE',
            data: deletedBlog
        })

    }
}

export default blogReducer