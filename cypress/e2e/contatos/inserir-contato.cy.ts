describe('Processo de Cadastro do Contato', () => {
  beforeEach(() => {
    cy.login('tiago@gmail.com', 'Tiago@123');

    cy.contains('a', 'Contatos').click();

    cy.get('[data-cy=btnAdicionar]').click();
  });

  it('Deve entrar na página corretamente', () => {
    cy.url().should('contain', '/contatos/inserir');
  });

  it('Deve cadastrar o contato corretamente', () => {
    cy.get('[data-cy=txtNome]').type('Teste Automatizado Cypress');

    cy.get('[data-cy=txtEmail]').type('teste@cypress.com');

    cy.get('[data-cy=txtTelefone]').type('49 99999-0000');

    cy.get('[data-cy=txtCargo]').type('Testador');

    cy.get('[data-cy=txtEmpresa]').type('Academia do Programador');

    cy.get('[data-cy=btnGravar]').click();

    cy.url().should('contain', '/contatos/listar');
  });
});
