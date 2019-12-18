import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {

    const notificationMessage = props.notifications.text
    const notificationStyle = props.notifications.style

    if (notificationMessage === undefined) {
        return null
    }

    return (
        <>
            {notificationStyle === 'positive'
                ?
                <Message positive>
                    {notificationMessage}
                </Message>
                :
                <Message error>
                    {notificationMessage}
                </Message>
            }

        </>
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