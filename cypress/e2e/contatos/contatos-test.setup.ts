export class ContatosTestSetup {
  public static obterContatoForm() {
    return {
      nome: () => cy.get('[data-cy=txtNome]'),
      email: () => cy.get('[data-cy=txtEmail]'),
      telefone: () => cy.get('[data-cy=txtTelefone]'),
      cargo: () => cy.get('[data-cy=txtCargo]'),
      empresa: () => cy.get('[data-cy=txtEmpresa]'),
      btnGravar: () => cy.get('[data-cy=btnGravar]'),
    };
  }
}
