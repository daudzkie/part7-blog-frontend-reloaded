import React from 'react'
import { render, fireEvent } from "@testing-library/react";
import Blog from './Blog'

describe('Testing <Blog /> component', () => {

    const blogExample = {
        title: 'Test title',
        author: 'Test author',
        likes: 1,
        user: {
            id: 'testId',
            name: 'Marco',
            username: 'testUsername'
        }
    }

    const userExample = {
        username: 'testUsername',
        name: 'Marco'
    }

    let likesMock = jest.fn()
    let deleteMock = jest.fn()

    let component

    beforeEach(() => {
        component = render(
            <Blog
                blog={blogExample}
                currentUser={userExample}
                deleteBlog={deleteMock}
                handleLikes={likesMock}
            />
        )
    })

    test('verify that only name and author are shown by default', () => {
        const defaultDiv = component.getByText('Test title - Test author')

        expect(defaultDiv).not.toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {

        // Find blog and click it
        const blogDiv = component.container.querySelector("#blog div")
        fireEvent.click(blogDiv)

        // Find ul with blog details
        const expandedDiv = component.container.querySelector("ul")

        expect(expandedDiv).not.toHaveStyle('display: none')
    })

})