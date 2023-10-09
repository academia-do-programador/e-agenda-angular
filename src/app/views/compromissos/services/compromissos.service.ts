import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view-model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';

@Injectable()
export class CompromissosService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/compromissos/';

  constructor(private http: HttpClient) {}

  public inserir(
    compromissso: FormsCompromissoViewModel
  ): Observable<FormsCompromissoViewModel> {
    return this.http
      .post<any>(this.endpoint, compromissso, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados));
  }

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
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