import React from 'react'
import { connect } from "react-redux";

const Notification = (props) => {

    const notificationMessage = props.notifications.text

    if (notificationMessage === '') {
        return null
    }

    return (
        <div className={props.notifications.style}>
            {notificationMessage}
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications
    }
}

export default connect(
    mapStateToProps
)(Notification)