/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * ? https://docs.cypress.io/guides/tooling/typescript-support#Types-for-Custom-Commands
       * @example cy.login()
       */
    }
  }
}

export {};
