import React, { useState } from 'react'
import { connect } from 'react-redux'

/* HOOKS */
import { useField } from '../hooks/index';

import { login, logout } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = (props) => {

    // Custom hooks
    const username = useField('text')
    const password = useField('password')

    // State hooks
    const [loginVisible, setloginVisible] = useState(false)

    // Log every user
    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {

            // Define credentials
            const credentials = {
                username: event.target.username.value,
                password: event.target.password.value
            }

            // This shoots the login function in userReducer,
            // which updates the state "or not"
            props.login(credentials)

        } catch (exception) {
            // If not, show an error
            props.setNotification('Wrong credentials. Try again.', 'error', 5)
        }

        // Set the token to be sent in each blog creation (POST)
        //blogService.setToken(loggedUser.token)

        // Empty the form fields using custom hook
        username.reset('')
        password.reset('')
    }

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        props.logout()
    }

    // Change HTML display property
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
        <div>
            {/* If user not logged, show loginForm */}
            {props.currentUser === '' ? 
                <>
                    {/* Show the login form */}
                    <div style={hideWhenVisible} >
                        <button onClick={() => setloginVisible(true)}>Log In</button>
                    </div>


                    <div style={showWhenVisible}>
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <div>
                                username
                            <input name="username" />
                            </div>
                            <div>
                                password
                            <input name="password" />
                            </div>
                            <button type="submit">Login</button>
                        </form>

                        {/* Hide the login form */}
                        <button onClick={() => setloginVisible(false)}>Cancel</button>

                    </div>
                </>
                : <p><b>{props.currentUser.name}</b> logged in
                    <button style={{ margin: '10px' }} onClick={handleLogout}>Log out</button>
                </p>
            }
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
    }
}


const mapDispatchToProps = {
    login,
    logout,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)