import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { EditarDespesaComponent } from './editar-despesa/editar-despesa.component';
import { DespesasService } from './services/despesas.service';

const formsDespesaResolver = (route: ActivatedRouteSnapshot) => {
  return inject(DespesasService).selecionarPorId(route.paramMap.get('id')!);
};

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
  {
    path: 'editar/:id',
    component: EditarDespesaComponent,
    resolve: { despesa: formsDespesaResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespesasRoutingModule {}
