import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const NavBar = () => {

    const currentPath = window.location.pathname
    const [activePage, setActivePage] = useState(currentPath)

    // currentPath on home === '/' so using 
    // 'to' parameter from the item accomplishes the task
    const handleItemClick = (e, { to }) => setActivePage(to)

    return (
        <Menu pointing secondary>
            <Menu.Item
                as={Link}
                to="/"
                name='home'
                active={activePage === '/'}
                onClick={handleItemClick}
            >
            </Menu.Item>
            <Menu.Item
                as={Link}
                to="/users"
                name='/users'
                active={activePage === '/users'}
                onClick={handleItemClick}
            >
            </Menu.Item>
        </Menu>
    )
}

export default NavBar