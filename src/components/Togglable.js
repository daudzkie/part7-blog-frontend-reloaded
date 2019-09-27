import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {/* props.children is used for referencing the
                    child components of the Togglable component. */}
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </>
    )
}

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable