import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import { connect } from 'react-redux'

import './App.css'

/* COMPONENTS */
import Menu from './components/Menu'
import Footer from './components/Footer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

/* REDUCERS */
import { initializeBlogs } from "./reducers/blogReducer";
import { relogin, getAllUsers } from './reducers/userReducer'
import Users from './components/Users';


const App = (props) => {

    useEffect(() => {
        props.initializeBlogs()
        props.getAllUsers()
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
            <Router>
                <Menu />
                <Notification />
                <LoginForm />
                {/* Add visibility functionality to the Blog Form */}
                <Togglable buttonLabel='New blog post'>
                    <BlogForm />
                    {/* If a component is defined with an automatically closing /> tag,
                props.children will be an empty array */}
                </Togglable>
                <Route exact path="/" render={() => <BlogList />} />
                <Route path="/users" render={() => <Users />} />
            </Router>
            <br />
            <Footer />
        </div>
    )
}

const mapDispatchToProps = {
    initializeBlogs,
    relogin,
    getAllUsers
}

export default connect(
    null,
    mapDispatchToProps
)(App)
