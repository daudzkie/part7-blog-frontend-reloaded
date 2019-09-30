import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    username,
    password,
    handleSubmit
}) => {
    return (
        <>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
            <div>
                username
                <input 
                    type={username.type}
                    value={username.value}
                    onChange={username.onChange}
                />
            </div>
            <div>
                password
                <input 
                    type={password.type}
                    value={password.value}
                    onChange={password.onChange}
                />
            </div>
            <button type="submit">Login</button>
        </form>
        </>
    )
}

LoginForm.propTypes = {
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default LoginForm