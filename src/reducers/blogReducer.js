import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            // Return an array with the state plus the action
            return [...state, action.data]
        case 'NEW_COMMENT':

            const blogId = action.data.id

            // Modify the comments from the blog
            const blogToUpdate = state.find(b => b.id === blogId)

            // Update the comments
            const updatedBlog = {
                ...blogToUpdate,
                comments: action.data.comments
            }

            /* Return the state with all the
            blogs that didn't change and the one
            with the comments added */
            return state.map(blog => 
                blog.id !== blogId ? blog : updatedBlog)

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
            blogs that didn't change and the liked one */
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

export const addComment =  (newComment, blog) => {
    return async dispatch => {

        const newObject = {
            id: blog.id,
            newComment: newComment,
            comments: blog.comments
        }

        const updatedBlog = await blogService.createComment(newObject)
        dispatch({
            type: 'NEW_COMMENT',
            data: updatedBlog
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