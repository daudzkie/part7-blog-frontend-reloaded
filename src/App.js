import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css'

/* COMPONENTS */
import Footer from './components/Footer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

import { initializeBlogs } from "./reducers/blogReducer";
import { relogin } from './reducers/userReducer'


const App = (props) => {

    useEffect(() => {
        props.initializeBlogs()
    })

    // Everytime the app renders, check localStorage for the user credentials
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)

            // Re-login the user and set the token to be able to create new blog posts
            props.relogin(user)
        }
    })

    return (
        <div>
            <h1>Blogs App</h1>
            <Notification />
            <LoginForm />
            {/* Add visibility functionality to the Blog Form */}
            <Togglable buttonLabel='New blog post'>
                <BlogForm />
                {/* If a component is defined with an automatically closing /> tag,
                props.children will be an empty array */}
            </Togglable>
            <BlogList />
            <Footer />
        </div>
    )
}

export default connect(
    null,
    { initializeBlogs,
        relogin
    }
)(App)
