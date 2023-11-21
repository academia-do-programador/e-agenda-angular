describe('Primeiro acesso à aplicação', () => {
  it('Deve redirecionar para a página de login', () => {
    cy.visit('/');

    // o Url deve conter 'login'
    cy.url().should('contain', 'login');
  });
});
