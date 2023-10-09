import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  Routes,
} from '@angular/router';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { FormsCompromissoViewModel } from './models/forms-compromisso.view-model';
import { CompromissosService } from './services/compromissos.service';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';

const formsCompromissoResolver: ResolveFn<FormsCompromissoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(CompromissosService).selecionarPorId(route.paramMap.get('id')!);
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarCompromissosComponent,
  },

  {
    path: 'inserir',
    component: InserirCompromissoComponent,
  },
  {
    path: 'editar/:id',
    component: EditarCompromissoComponent,
    resolve: { compromisso: formsCompromissoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompromissosRoutingModule {}
