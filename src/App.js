import React, { useState, useEffect } from 'react'
import './App.css'

/* COMPONENTS */
import Footer from './components/Footer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

/* SERVICES */
import loginService from './services/login'
import blogService from './services/blogs'

/* HOOKS */
import { useField } from './hooks/index';

const App = () => {

    // Custom hooks
    const username = useField('text')
    const password = useField('password')
    // State hooks
    const [user, setUser] = useState(null)
    const [newBlog, setNewBlog] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [blogs, setBlogs] = useState([])
    const [noficationMessage, setnoficationMessage] = useState(null)
    const [notificationType, setnotificationType] = useState(null)
    const [loginVisible, setloginVisible] = useState(false)
    const [showSorted, setshowSorted] = useState(false)

    useEffect(() => {
        blogService
            .getAll()
            .then(initialBlogs => {
                // setBlogs update the state of the component
                // triggering the re-render
                setBlogs(initialBlogs)
            })
    }, [])

    // Everytime the app renders, check localStorage for the user credentials
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {

            const user = JSON.parse(loggedUserJSON)

            // Re-set the user and his token to be able to create new blog posts
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    // Log every user
    const handleLogin = async (event) => {
        event.preventDefault()
        try {

            // Define credentials
            const credentials = {
                username: username.value,
                password: password.value
            }

            // Send login request and save user information on `user`
            const user = await loginService.login(credentials)

            // If login is successful
            // Save user data into localstorage
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )

            // Set the token to be sent in each blog creation (POST)
            blogService.setToken(user.token)

            setUser(user)

            // Empty the form fields using custom hook
            username.setValue('')
            password.setValue('')

        } catch (exception) {

            // If not, show an error
            setnotificationType('error')
            setnoficationMessage('Wrong credentials')
            setTimeout(() => {
                setnoficationMessage(null)
                setnotificationType(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const loginForm = () => {

        // Change HTML display property
        const hideWhenVisible = { display: loginVisible ? 'none' : '' }
        const showWhenVisible = { display: loginVisible ? '' : 'none' }

        return (
      <>
        {/* Show the login form */}
        <div style={hideWhenVisible}>
            <button onClick={() => setloginVisible(true)}>Log In</button>
        </div>

        <div style={showWhenVisible}>
            <LoginForm
                username={username}
                password={password}
                handleSubmit={handleLogin}
            />

            {/* Hide the login form */}
            <button onClick={() => setloginVisible(false)}>Cancel</button>
        </div>
      </>
        )
    }

    const addBlog = async (event) => {
    // Prevent page reloading
        event.preventDefault()

        // Create new blog object
        const blogObject = {
            title: newBlog,
            author: newAuthor,
            url: newUrl,
            user: user.id
        }

        const createdBlog = await blogService.create(blogObject)

        setBlogs(blogs.concat(createdBlog))

        setNewBlog('')
        setNewAuthor('')
        setNewUrl('')

        setnotificationType('success')

        setnoficationMessage(
            `A new blog "${createdBlog.title}" was created`
        )
        setTimeout(() => {
            setnoficationMessage(null)
            setnotificationType(null)
        }, 5000)

    }

    const removeBlog = async (blogId, blogName) => {

        try {
            // Utiliza el blogService para enviar una DELETE request
            await blogService.deleteBlog(blogId)

            /* Actualiza los posts a renderizar
      excluyendo al que coincide con el
      id recientemente eliminado. */
            setBlogs(blogs.filter(blog => blog.id !== blogId))


            // Muestra notificación por 5 seg. y vuelve a su estado original
            setnotificationType('success')
            setnoficationMessage(
                `${blogName} has been removed from server.`
            )
            setTimeout(() => {
                setnoficationMessage(null)
                setnotificationType(null)
            }, 5000)

        } catch (error) {
            console.log('Error', error)

            let errorMessage = error.response.data.error

            setnoficationMessage(errorMessage)

            setTimeout(() => {
                setnoficationMessage(null)
            }, 5000)
        }

    }

    const handleBlogLikes = async (blogId, blogLikes) => {

        // Set the number of likes
        const blogObject = {
            likes: blogLikes + 1,
        }

        // Send the PUT request through the blogService
        const updatedBlog = await blogService.update(blogId, blogObject)

        // Change only the updated blog on the list of blogs
        setBlogs(blogs.map(blog =>
            blog.id !== blogId
                ? blog
                : updatedBlog
        ))

    }

    const handleSort = (event) => {

        showSorted
            ? event.target.textContent = 'Most liked'
            : event.target.textContent = 'Creation order'

        setshowSorted(!showSorted)

    }

    // Do not mutate data
    // Create a new array with the current blogs
    let blogsToSort = Array.from(blogs)

    /**
   * Si `showSorted` === `false`, `blogsToShow` contendrá los blogs ordenados normalmente.
   * Si no contendrá los blogs ordenaods por cantidad de likes.
   */
    const blogsToShow = showSorted
        ? blogsToSort.sort((a, b) => b.likes - a.likes)
        : blogs

    return (
        <div>
            <h1>Blogs App</h1>

            <Notification message={noficationMessage} type={notificationType} />

            {/* If user not logged, show loginForm */}
            {
                user === null ?
                    loginForm() :
          <>
            <p>{user.name} logged in
                <button style={{ margin: '10px' }} onClick={handleLogout}>Log out</button>
            </p>
            {/* Add visibility functionality to the Blog Form */}
            <Togglable buttonLabel='New blog post'>
                <BlogForm
                    onSubmit={addBlog}
                    title={newBlog}
                    author={newAuthor}
                    url={newUrl}
                    handleBlogChange={({ target }) => setNewBlog(target.value)}
                    handleAuthorChange={({ target }) => setNewAuthor(target.value)}
                    handleUrlChange={({ target }) => setNewUrl(target.value)}
                />
                {/* If a component is defined with an automatically closing /> tag,
                props.children will be an empty array */}
            </Togglable>
            <div style={({ marginBottom: 10 })}>
                <h3>Blogs</h3>
                <h5>Order by</h5>
                <button onClick={handleSort}>Most liked</button>
            </div>
            <BlogList
                blogsToShow={blogsToShow}
                handleLikes={handleBlogLikes}
                deleteBlog={removeBlog}
                currentUser={user}
            />
          </>
            }

            <Footer />
        </div>
    )
}

export default App
