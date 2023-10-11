import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarDespesasComponent,
  },

  {
    path: 'inserir',
    component: InserirDespesaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespesasRoutingModule {}
