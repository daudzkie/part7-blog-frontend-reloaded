import React, { useState, useEffect } from 'react';
import './App.css';

/* COMPONENTS */
import Blog from "./components/Blog";
import Footer from './components/Footer';
import Notification from './components/Notification';


/* SERVICES */
import loginService from "./services/login";
import blogService from './services/blogs'


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

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        // setNotes update the state of the component
        // triggering the re-render and consequently
        // the console log('render 3 notes)
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

  const loginForm = () => (
    <>
    
    <h2>Login</h2>

    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
    </>
  )

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

  const blogForm = () => (
    <>
    <h2>Create new blog post</h2>
    <form onSubmit={addBlog}> 
      <div>
        Title: 
        <input
            type="text"
            value={newBlog}
            name="Blog"
            onChange={({ target }) => setNewBlog(target.value)}
        />
      </div>
      <div>
        Author:
        <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
      </div>
      <div>
        URL:
        <input
            type="text"
            value={newUrl}
            name="URL"
            onChange={({ target }) => setNewUrl(target.value)}
          />
      </div>
        <button type="submit">Create</button>
    </form>
    </>
  )

  // Generate a new Blog element for each blog
  const listBlogs = () => blogs.map(blog => 
      <Blog
        key={blog.id}
        blog={blog}
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
            {blogForm()}
            <br/>
            <h3>Blogs</h3>
            {listBlogs()}
          </>
      }

      <Footer />
    </div>
  )
}

export default App;
