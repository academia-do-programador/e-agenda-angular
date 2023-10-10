import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';

const routes: Routes = [
  {
    path: 'inserir',
    component: InserirCategoriaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule {}
