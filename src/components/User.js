import React from 'react'
import { connect } from "react-redux";

const User = (props) => {

    console.log(props)
    if (props.userData === undefined) {
        return null
    }

    // Nested destructuring
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Nested_object_and_array_destructuring

    // blogs refer to the object received from props and is assigned to userBlogs
    // The rest of the fields from props are assigned to userInfo
    const { blogs:userBlogs, userInfo } = props.userData


    return (
        <>
            <h2>{userInfo}</h2>

            <h3>Added blogs</h3>
            <div>
                <ul>
                    {userBlogs.map(blog =>
                        <div key={blog.id}>
                            <li>{blog.title}</li>
                        </div>
                    )}

                </ul>
            </div>
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