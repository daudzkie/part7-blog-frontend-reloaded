import React from 'react'
import { connect } from "react-redux";
import { Card, List, Header, Loader } from 'semantic-ui-react';

const User = (props) => {

    if (props.userData === undefined) {
        return <Loader active inline='centered' />
    }

    // Nested destructuring
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Nested_object_and_array_destructuring

    // blogs refer to the object received from props and is assigned to userBlogs
    // The rest of the fields from props are assigned to userInfo
    const { blogs: userBlogs, ...userInfo } = props.userData


    return (
        <>
            <Card
                header={`Name: ${userInfo.name}`}
                meta={`Username: ${userInfo.username}`}
                extra={`N° of blogs: ${userBlogs.length}`}
            />

            <Header as="h3">Added blogs</Header>
            <List animated celled>
                {userBlogs.map(blog =>
                    <List.Item key={blog.id}>
                        <li>{blog.title}</li>
                    </List.Item>
                )}

            </List>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {

    // Use the prop passed in the rendering of the component 
    // <User id={'someId'} => ownProps.id == 'someId'
    const userId = ownProps.id

    // Get userList from current state
    const users = state.users.userList

    // Filter current user data
    const userData = users.find(u => u.id === userId)

    return { userData }

}



export default connect(
    mapStateToProps
)(User)