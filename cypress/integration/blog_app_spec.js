describe('Blog app', function () {

    describe('Modifying the state of the DB', function () {
        beforeEach(function () {
            // Reset the state of the DB
            cy.request('POST', 'http://localhost:3003/api/testing/reset')

            const user = {
                name: 'Testing user',
                username: 'testing',
                password: 'user'
            }
            // Create a new user
            cy.request('POST', 'http://localhost:3003/api/users/', user)

            cy.visit('http://localhost:3000')
        })

        describe('when logged in', function () {
            beforeEach(function () {
                cy.contains('Log In')
                    .click()
                cy.get('[data-cy=username]')
                    .type('testing')
                cy.get('[data-cy=password]')
                    .type('user')
                cy.get('[data-cy=submit]')
                    .click()
            })

            it('name of the user is shown', function () {
                cy.contains('Testing user logged in')
            })

            it('a new blog can be created', function () {
                cy.get('[data-cy=new-blog]')
                    .click()
                cy.get('[data-cy=title-input]')
                    .type('a note created by Cypress')
                cy.get('[data-cy=author-input]')
                    .type('Marcho Sancho')
                cy.get('[data-cy=url-input]')
                    .type('https://cypress.com')
                cy.get('[data-cy=blog-submit]')
                    .click()
                cy.contains('a note created by Cypress')
            })

            it('a blog can be commented', function () {
                cy.contains('a note created by Cypress')
                    .click()
                cy.get('[data-cy=comment-input]')
                    .type('Saved to read later')
                cy.contains('Add comment')
                    .click()
                cy.contains('Saved to read later')
            })
        })
    })
})