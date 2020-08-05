/// <reference types="cypress" />

context('Login', () => {
  beforeEach(() => {
    // I intentionally didn't block BE requests and didn't mock them because the lack of time
    cy.visit('http://localhost:3000')
  })

  it('should show error message when provide incorrect data', () => {
    cy.get('#email').type('incorrect@mail')
    cy.get('#password').type('incorrect@password')

    cy.get('button').click()

    cy.contains('Wrong emails/password. Please try again.')
  })
})
