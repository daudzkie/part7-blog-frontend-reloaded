import React from 'react'
import { connect } from "react-redux";


const userList = (props) => {

    console.log('PROPS', props)
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
                                <td>{user.name}</td>
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