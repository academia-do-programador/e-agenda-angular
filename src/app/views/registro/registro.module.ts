import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './registro.component';
import 'src/app/extensions/form-group.extension';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroRoutingModule } from './registro-routing.module';

@NgModule({
  declarations: [RegistroComponent],
  imports: [CommonModule, RegistroRoutingModule, ReactiveFormsModule],
})
export class RegistroModule {}
