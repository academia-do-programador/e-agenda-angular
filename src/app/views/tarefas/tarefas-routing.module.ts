import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirTarefaComponent } from './inserir-tarefa/inserir-tarefa.component';

const routes: Routes = [
  {
    path: 'inserir',
    component: InserirTarefaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefasRoutingModule {}
