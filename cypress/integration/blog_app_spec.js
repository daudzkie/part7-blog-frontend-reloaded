describe('Blog app', function() {
    beforeEach(function() {
        // Port 9080 when executed with npx static-server 
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Blogs App')
    })

    it('user can login', function () {
        cy.contains('Log In')
            .click()
        cy.get('[data-cy=username]')
            .type('rich')
        cy.get('[data-cy=password]')
            .type('rich')
        cy.get('[data-cy=submit]')
            .click()
        cy.contains('Marco logged in')
    })  
})