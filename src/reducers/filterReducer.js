const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter
        default:
            return state
    }

}

/**
 * Action creator
 * @param {string} filter Filter to be set
 */
export const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        filter
    }
}

export default filterReducer