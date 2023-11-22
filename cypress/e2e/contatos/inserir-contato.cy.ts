describe('Processo de Cadastro do Contato', () => {
  beforeEach(() => {
    cy.login('tiago@gmail.com', 'Tiago@123');
  });

  it('Deve entrar na página corretamente', () => {
    cy.contains('a', 'Contatos').click();

    cy.get('[data-cy=btnAdicionar]').click();

    cy.url().should('contain', '/contatos/inserir');
  });
});
