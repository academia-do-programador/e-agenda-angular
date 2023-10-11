import { Component, OnInit } from '@angular/core';
import { ListarDespesaViewModel } from '../models/listar-despesa.view-model';
import { DespesasService } from '../services/despesas.service';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css'],
})
export class ListarDespesasComponent implements OnInit {
  despesas: ListarDespesaViewModel[] = [];

  constructor(private despesasService: DespesasService) {}

  ngOnInit(): void {
    this.despesasService
      .selecionarTodos()
      .subscribe((res) => (this.despesas = res));
  }
}
