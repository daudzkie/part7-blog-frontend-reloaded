import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
    test('5.16 - if no user logged, blogs are not rendered', async () => {
        const component = render(
            <App />
        )

        // This is done to ensure that all of the effects are executed
        // Might be fixed in future version of React
        component.rerender(<App />)

        /* Wait for the login button to be rendered
        https://testing-library.com/docs/dom-testing-library/api-async#waitforelement */
        await waitForElement(() => component.getByText('Log In'))

        expect(component.container).not.toHaveTextContent('New blog post')
    })

    test('5.17 - When user logged in, posts are rendered', async () => {

        const user = {
            username: 'tester',
            token: 'bearer 123456789',
            name: 'Donald Tester'
        }

        // Manually login a user using our localStorage mock
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

        const component = render(<App />)

        // This is done to ensure that all of the effects are executed
        // Might be fixed in future version of React
        component.rerender(<App />)

        /* Wait for the login button to be rendered
        https://testing-library.com/docs/dom-testing-library/api-async#waitforelement */
        await waitForElement(() => component.getByText('Donald Tester logged in'))

        /* Tests  */

        expect(component.container).toHaveTextContent(
            '1st post'
        )

        expect(component.container).toHaveTextContent(
            'Testing user auth'
        )

        expect(component.container).toHaveTextContent(
            '2da prueba'
        )

        const blogs = component.container.querySelectorAll('#blog')
        expect(blogs.length).toBe(3)
    })
})