import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompromissosService } from './services/compromissos.service';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';

@NgModule({
  declarations: [
    InserirCompromissoComponent,
    ListarCompromissosComponent
  ],
  imports: [CommonModule, RouterModule, NgbModule, ReactiveFormsModule],
  providers: [CompromissosService],
})
export class CompromissosModule {}
