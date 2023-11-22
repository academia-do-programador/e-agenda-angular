describe('Página de Login', () => {
  it('Deve mostrar notificação de email não preenchido', () => {
    cy.visit('/');

    cy.get('[data-cy=btnEntrar]').click();

    cy.contains('O campo "email" é obrigatório!');
  });

  it('Deve mostar notificação de senha não preenchida', () => {
    cy.visit('/');

    cy.get('[data-cy=txtEmail]').type('teste@gmail.com');

    cy.get('[data-cy=btnEntrar]').click();

    cy.contains('O campo "senha" é obrigatório!');
  });

  it('Deve logar e redirecionar usuário', () => {
    cy.visit('/');

    cy.get('[data-cy=txtEmail]').type('tiago@gmail.com');
    cy.get('[data-cy=txtSenha]').type('Tiago@123');

    cy.get('[data-cy=btnEntrar]').click();

    cy.url().should('contain', 'dashboard');
  });
});
