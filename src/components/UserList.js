import React from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const userList = (props) => {

    console.log('list', props)
    /* When navigating directly to /users/, the React application
    has not yet received the data from the backend.  */
    if (props.users === undefined) {
        return null
    }

    return (
        <>
            <div style={({ marginBottom: 10 })}>
                <h3>Users</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>N° of blogs created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Generate a new row for each user */}
                        {props.users.map(user => 
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users.userList
    }
}

export default connect(
    mapStateToProps
)(userList)