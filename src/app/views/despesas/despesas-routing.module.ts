import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';

const routes: Routes = [
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
