import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = '', action) => {

    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return ''
        default:
            return state
    }
}

/**
 * Log the user through the loginService (Backend)
 * Then dispatch an action to update the global state
 * with the current user logged in
 * @param credentials username & password
 */
export const login = credentials => {
    return async dispatch => {
        
        // Send login request and save user information on `user`
        const loggedUser = await loginService.login(credentials)

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

export default userReducer