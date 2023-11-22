import { ContatosTestSetup } from './contatos-test.setup';

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
    const form = ContatosTestSetup.obterContatoForm();

    form.nome().type('Teste Automatizado Cypress');

    form.email().type('teste@cypress.com');

    form.telefone().type('49 99999-0000');

    form.cargo().type('Testador');

    form.empresa().type('Academia do Programador');

    form.btnGravar().click();

    cy.url().should('contain', '/contatos/listar');
  });
});
