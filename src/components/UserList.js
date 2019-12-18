import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Table } from 'semantic-ui-react'

const userList = (props) => {

    /* When navigating directly to /users/, the React application
    has not yet received the data from the backend.  */
    if (props.users === undefined) {
        return null
    }

    return (
        <>
                <Header as="h2">Users</Header>

                <Table compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                            <Table.HeaderCell>N° of blogs created</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {/* Generate a new row for each user */}
                        {props.users.map(user =>
                            <Table.Row key={user.id}>
                                <Table.Cell>
                                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                                </Table.Cell>
                                <Table.Cell>{user.blogs.length}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
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