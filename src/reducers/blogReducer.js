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

            /* Return the state with all the 
            blogs not changed and the liked one */
            return state.map(blog =>
                blog.id !== id ? blog : likedBlog
            )
        case 'REMOVE':
            /* Actualiza los posts a renderizar
              excluyendo al que coincide con el
              id recientemente eliminado. */

            // Extract blog id
            const blogToRemoveID = action.data.id

            // Return the blogs without the removed one
            return state.filter(b => b.id !== blogToRemoveID)
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

        // Create an object with the property to be changed
        const likesObject = {
            likes: blog.likes + 1
        }

        // Send the PUT request with blog likes + 1 added
        const likedBlog = await blogService.update(blog.id, likesObject)
        dispatch({
            type: 'LIKE',
            data: likedBlog
        })
    }
}

export const removeBlog = blog => {
    return async dispatch => {

        // Utiliza el blogService para enviar una DELETE request
        await blogService.deleteBlog(blog.id)
        
        dispatch({
            type: 'REMOVE',
            data: blog
        })

    }
}

export default blogReducer