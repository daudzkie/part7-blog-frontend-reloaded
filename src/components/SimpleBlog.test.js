import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('component renders title, author and likes', () => {
    const blogExample = {
        title: 'Simple title',
        author: 'Simple author',
        likes: 1
    }

    const component = render(
        <SimpleBlog blog={blogExample} />
    )

    component.debug()

    const titleDiv = component.container.querySelector('.title')
    expect(titleDiv).toHaveTextContent('Simple title - Simple author')

    const likesDiv = component.container.querySelector('.likes')
    expect(likesDiv).toHaveTextContent('blog has 1 likes')


})

test('if the like button is pressed twice, the function is called twice', () => {
    const blogExample = {
        title: 'Simple title',
        author: 'Simple author',
        likes: 1
    }

    // Define a mock function to pass to the component
    const mockHandler = jest.fn()

    /* This is a shorter version of saving into "component"
    and then calling component.getByText */
    const { getByText } = render(
        <SimpleBlog blog={blogExample} onClick={mockHandler} />
    )

    // Find the button by text and double click it
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    // Expect 2 clicks
    expect(mockHandler.mock.calls.length).toBe(2)
})