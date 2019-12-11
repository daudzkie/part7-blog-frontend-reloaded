const notificationReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_NOTIFICATION':
            // Send the text and style data to Notification component
            return action.data
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

/* ACTION CREATORS */
const createNotification = ({ text, style }) => {
    return {
        type: 'CREATE_NOTIFICATION',
        data: {
            text,
            style
        }
    }
}
const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

// https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559
/**
 * 
 * @param {string} text The notification message
 * @param {int} time The number of seconds to be shown
 * @param {string} style success or error
 */
export const setNotification = (text, style, time) => {
    return async dispatch => {
        await dispatch(createNotification({ text, style }))

        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export default notificationReducer