import React, { useState, useEffect } from 'react';
import './App.css';

/* COMPONENTS */
import Blog from "./components/Blog";
import Footer from './components/Footer';
import Notification from './components/Notification';


/* SERVICES */
import loginService from "./services/login";
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';


const App = () => {

  // State hooks
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [blogs, setBlogs] = useState([])
  const [noficationMessage, setnoficationMessage] = useState(null)
  const [notificationType, setnotificationType] = useState(null)
  const [loginVisible, setloginVisible] = useState(false)

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
      const user = await loginService.login({
        username, password
      })

      // If login is successful
      // Save user data into localstorage
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      // Set the token to be sent in each blog creation (POST)
      blogService.setToken(user.token)

      setUser(user)
      // Empty the form fields
      setUsername('')
      setPassword('')
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
    const showWhenVisible = { display: loginVisible ? '' : 'none'}
    
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
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
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

  // Generate a new Blog element for each blog
  const listBlogs = () => blogs.map(blog => 
      <Blog
        key={blog.id}
        blog={blog}
        handleLikes={handleBlogLikes}
      />
    )
  


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
              <button style={{margin: "10px"}} onClick={handleLogout}>Log out</button>
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
            <h3>Blogs</h3>
            {listBlogs()}
          </>
      }

      <Footer />
    </div>
  )
}

export default App;
