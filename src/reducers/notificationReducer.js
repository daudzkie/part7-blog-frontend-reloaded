const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'CREATE_NOTIFICATION':
            return `${action.data.content}`

        case 'REMOVE_NOTIFICATION':
            return ''

        default:
            return state
    }
}

/* ACTION CREATORS */

const createNotification = (content) => {
    return {
        type: 'CREATE_NOTIFICATION',
        data: {
            content
        }
    }
}
const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

// https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559
export const setNotification = (text, time) => {
    return async dispatch => {
        await dispatch(createNotification(text))

        setTimeout(() => {
            dispatch(removeNotification())
        }, time * 1000)
    }
}

export default notificationReducer