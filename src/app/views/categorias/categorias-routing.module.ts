import { NgModule, inject } from '@angular/core';
import { ResolveFn, RouterModule, Routes } from '@angular/router';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { ListarCategoriaViewModel } from './models/listar-categoria.view-model';
import { CategoriasService } from './services/categorias.service';

const listarCategoriasResolver: ResolveFn<ListarCategoriaViewModel[]> = () => {
  return inject(CategoriasService).selecionarTodos();
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarCategoriasComponent,
    resolve: { categorias: listarCategoriasResolver },
  },
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
