import React from 'react'
import { connect } from "react-redux";

const Notification = (props) => {

    const notificationMessage = props.message

    if (notificationMessage === null) {
        return null
    }

    if (props.type === 'success') {
        return (
            <div className='success'>
                {notificationMessage}
            </div>
        )
    }

    return (
        <div className='error'>
            {notificationMessage}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications
    }
}

export default connect(mapStateToProps)(Notification)