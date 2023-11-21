describe('Página de Login', () => {
  it('Deve mostrar notificação de email não preenchido', () => {
    cy.visit('/');

    cy.get('button[type=submit]').click();

    cy.contains('O campo "email" é obrigatório!');
  });

  it('Deve mostar notificação de senha não preenchida', () => {
    cy.visit('/');

    cy.get('[formControlName=email]').type('teste@gmail.com');

    cy.get('button[type=submit]').click();

    cy.contains('O campo "senha" é obrigatório!');
  });

  it('Deve logar e redirecionar usuário', () => {
    cy.visit('/');

    cy.get('[formControlName=email]').type('tiago@gmail.com');
    cy.get('[formControlName=senha]').type('Tiago@123');

    cy.get('button[type=submit]').click();

    cy.url().should('contain', 'dashboard');
  });
});
