import React, { useState, useEffect } from 'react';
import './App.css';

import Footer from './components/Footer';

/* SERVICES */
import loginService from "./services/login";


const App = () => {

  // State hooks
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  // Log every user
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      // If login is successful
      // Save user data into localstorage
      /* window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token)
*/
      setUser(user)
      // Empty the form fields
      setUsername('')
      setPassword('')
    } catch (exception) {

      /* // If not, show an error
      seterrorMessage('Wrong credentials')
      setTimeout(() => {
        seterrorMessage(null)
      }, 5000) */
    }
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

  return (
    <div>
      {/* If user not logged, show loginForm */}
      {
        user === null ?
          loginForm() :
          <div>
            <h1>Blogs</h1>          
            <p>{user.name} logged in</p>
            <br/>
            <div> Things I Don't Know as of 2018 - Dan Abramov </div>
          </div>
      }

      <Footer />
    </div>
  )
}

export default App;
