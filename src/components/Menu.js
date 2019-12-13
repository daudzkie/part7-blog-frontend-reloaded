import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = () => {

    const ulStyle = {
        'listStyleType': 'none',
        'margin': 0,
        'padding': 0,
        'overflow': 'hidden',
        'borderStyle': 'groove',
        'borderColor': 'aqua',
        'borderRadius': '10px'
    }

    const liStyle = {
        'float': 'left'
    }

    const linkStyle = {
        'display': 'block',
        'textAlign': 'center',
        'padding': '8px 16px',
        'textDecoration': 'none'
    }

    return (
        <div>
            <ul style={ulStyle}>
                <li style={liStyle}><NavLink to='/' style={linkStyle}>Home</NavLink></li>
                <li style={liStyle}><NavLink to='/users' style={linkStyle}>Users</NavLink></li>
                <br />
            </ul>
        </div>
    )
}

export default Menu