const { randomStr } = require('../../../utils/random')
describe('Account end-to-end test', () => {
  const user = {
    last_name: randomStr(),
    first_name: randomStr(),
    email: randomStr(),
    password: randomStr(),
  }
  it('Sign up', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(1000)
    cy.get('#signed', { timeout: 2000 }).click()
    cy.get('#first_name', { timeout: 2000 }).type(user.first_name)
    cy.get('#last_name', { timeout: 2000 }).type(user.last_name)
    cy.get('#email_signUp', { timeout: 2000 }).type(user.email)
    cy.get('#password', { timeout: 2000 }).type(user.password)
    cy.get('#signup > .button', { timeout: 2000 }).click()
    cy.get('#last_name', { timeout: 2000 }).should('have.text', `last_name : ${user.last_name}`)
    cy.get('#first_name', { timeout: 2000 }).should('have.text', `first_name : ${user.first_name}`)
    cy.wait(1000)
  })

  it('Sign In', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(1000)
    cy.get('#signed', { timeout: 2000 }).click()
    cy.get(':nth-child(2) > a', { timeout: 2000 }).click()
    cy.get('#email_signIn', { timeout: 2000 }).type(user.email)
    cy.get('#password2_signIn', { timeout: 2000 }).type(user.password)
    cy.get('#login > .button', { timeout: 2000 }).click()
    cy.wait(1000)
  })

  it('Sign out', () => {
    cy.wait(1000)
    cy.get('#signed', { timeout: 2000 }).click()
    cy.get('#last_name', { timeout: 2000 }).should('have.text', '')
    cy.get('#first_name', { timeout: 2000 }).should('have.text', '')
    cy.wait(1000)
  })
})
