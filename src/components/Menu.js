import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    const menuStyle = {
        'border': 'aqua',
        'borderStyle': 'groove'
    }
    const padding = { paddingRight: 5 }
    return (
        <div style={menuStyle}>
            <Link to='/' style={padding}>Home</Link>
            <Link to='users' style={padding}>Users</Link>
            <br />
        </div>
    )
}

export default Menu