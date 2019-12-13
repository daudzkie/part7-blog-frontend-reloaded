import userService from '../services/users'
import blogService from '../services/blogs'

const initialState = {
    currentUser: '',
    userList: []
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN':
            console.log(action.data)

            return {
                ...state,
                currentUser: action.data
            }
        case 'LOGOUT':
            return ''
        case 'GET_USERS':

            return {
                ...state,
                userList: action.data
            }
        case 'NEW_BLOG':
            // Update the user's blogs array

            console.log('new Blog', action.data)

            console.log('current state', state)
            
            // Get the newly created blog
            let newBlog = action.data

            // Get the userId who created the blog
            let userId = action.data.user

            // Clone the userList with his nested props
            let newUserList = [...state.userList]

            /**
             * Find the user who created the blog in the list
             * Then PUSH the new blog into the `blogs` array
             * This MODIFIES the newUserList
             */
            newUserList
                .find(u => u.id === userId)
                .blogs.push(newBlog)

            return {
                ...state,
                userList: newUserList
            }
            
            
        default:
            return state
    }
}

/**
 * Log the user through the userService (Backend)
 * Then dispatch an action to update the global state
 * with the current user logged in
 * @param credentials username & password
 */
export const login = credentials => {
    return async dispatch => {
        
        // Send login request and save user information on `user`
        const loggedUser = await userService.login(credentials)

        // Set token to be able to create new blog posts
        blogService.setToken(loggedUser.token)

        // If login is successful
        // Save user data into localstorage
        window.localStorage.setItem(
            'loggedBlogAppUser', JSON.stringify(loggedUser)
        )


        dispatch({
            type: 'LOGIN',
            data: loggedUser
        })
    }
}

/**
 * As the user is already logged in, only
 * dispatch an action to update the global state
 * with the current user data
 * @param credentials username, name & token
 */
export const relogin = credentials => {

    // Set token to be able to create new blog posts
    blogService.setToken(credentials.token)
    
    return {
        type: 'LOGIN',
        data: credentials
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const getAllUsers = () => {
    return async dispatch => {

        const users = await userService.getAllUsers()

        // Then dispatches the blogs to the action, which adds them to the store.
        dispatch({
            type: 'GET_USERS',
            data: users
        })
    }
}

export default userReducer