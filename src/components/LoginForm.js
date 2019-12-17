import React, { useState } from 'react'
import { connect } from 'react-redux'

/* HOOKS */
import { useField } from '../hooks/index'

import { login, logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form, Input, Icon } from 'semantic-ui-react'

const LoginForm = (props) => {

    // Custom hooks
    const username = useField('text')
    const password = useField('password')


    /**
     *  Toma el valor de `reset` dentro de`username` y lo guarda en`resetTitle`
     *  Las demas propiedades de`username` son pasadas a`usernameProps`
     **/
    const { reset: resetUsername, ...usernameProps } = username
    const { reset: resetPassword, ...passwordProps } = password

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
            props.setNotification('Wrong credentials. Try again.', 'negative', 5)
        }

        // Set the token to be sent in each blog creation (POST)
        //blogService.setToken(loggedUser.token)

        // Empty the form fields using custom hook
        resetUsername()
        resetPassword()
    }


    /**
     * Erase localstorage, reset state variables, hide loginForm
     * and call the logout function from userReducer
     */
    const handleLogout = async () => {
        window.localStorage.removeItem('loggedBlogAppUser')

        resetUsername()
        resetPassword()
        setloginVisible(false)

        props.logout()
    }

    // Change HTML display property
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
        <div>
            {/* If user not logged, show loginForm */}
            {props.currentUser === undefined ?
                <>
                    {/* Show the login form */}
                    <div style={hideWhenVisible} >
                        <Button onClick={() => setloginVisible(true)} color='green'>Log In</Button>
                    </div>

                    <div style={showWhenVisible}>
                        <h2>Login</h2>
                        <Form onSubmit={handleLogin}>
                            <Form.Field inline required>
                                <label>Username</label>
                                <Input name="username" {...usernameProps} />
                            </Form.Field>
                            <Form.Field inline required>
                                <label>Password</label>
                                <Input
                                    name="password"
                                    {...passwordProps}
                                />
                            </Form.Field>
                            {/* Hide the login form */}
                            <Button positive type="submit">Submit</Button>
                            <Button type="button" onClick={() => setloginVisible(false)} >Cancel</Button>
                        </Form>
                    </div>
                </>
                : <p>
                    <Icon name="user circle" />
                    <b>{props.currentUser.name}</b> logged in
                    <Button
                        negative
                        style={{ margin: '10px' }}
                        onClick={handleLogout}>Log out
                    </Button>
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