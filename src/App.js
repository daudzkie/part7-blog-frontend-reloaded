import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import { connect } from 'react-redux'

/* COMPONENTS */
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

/* REDUCERS */
import { initializeBlogs } from './reducers/blogReducer'
import { relogin, getAllUsers } from './reducers/userReducer'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import { Container, Header } from 'semantic-ui-react'

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

    let h1Margin = {
        marginTop: '2em'
    }

    return (
        <Container>
            <div>
                <Header as="h1" style={h1Margin} textAlign="center">
                    Blogs App - <a href="https://fullstackopen.com/en/">
                        Fullstack Open Course
                    </a>
                </Header>
                <Router>
                    <Notification />
                    <NavBar />
                    <LoginForm />
                    <Route exact path="/" render={() =>
                <>
                <Header as="h2">Blogs</Header>
                    {/* Add visibility functionality to the Blog Form */}
                    <Togglable buttonLabel='New blog post'>
                        <BlogForm />
                        {/* If a component is defined with an automatically closing /> tag,
                        props.children will be an empty array */}
                    </Togglable>
                    <BlogList />
                </>

                    }/>

                    <Route path="/blogs/:id" render={({ match }) =>
                        <Blog id={match.params.id} />
                    }/>
                    <Route path="/users" render={() => <UserList />} />
                    <Route exact path="/users/:id" render={({ match }) =>
                        <User id={match.params.id} />
                    }/>
                </Router>
                <br />
                <Footer />
            </div>
        </Container>
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
