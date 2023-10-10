import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsCategoriaViewModel } from '../models/forms-categoria.view-model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListarCategoriaViewModel } from '../models/listar-categoria.view-model';

@Injectable()
export class CategoriasService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/categorias/';

  constructor(private http: HttpClient) {}

  public inserir(
    categoria: FormsCategoriaViewModel
  ): Observable<FormsCategoriaViewModel> {
    return this.http
      .post<any>(this.endpoint, categoria, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarTodos(): Observable<ListarCategoriaViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  private obterHeadersAutorizacao() {
    const token = environment.apiKey;

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}
