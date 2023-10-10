import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { InserirCategoriaComponent } from './inserir-categoria/inserir-categoria.component';
import { CategoriasService } from './services/categorias.service';
import { ReactiveFormsModule } from '@angular/forms';
import 'src/app/extensions/form-group.extension';

@NgModule({
  declarations: [InserirCategoriaComponent],
  imports: [CommonModule, CategoriasRoutingModule, ReactiveFormsModule],
  providers: [CategoriasService],
})
export class CategoriasModule {}
