declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, senha: string): typeof login;
  }
}

function login(email: string, senha: string) {
  cy.visit('/');

  cy.get('[data-cy=txtEmail]').type(email);
  cy.get('[data-cy=txtSenha]').type(senha);

  cy.get('[data-cy=btnEntrar]').click();

  cy.url().should('contain', 'dashboard');
}

Cypress.Commands.add('login', login);
