import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RegistrarUsuarioViewModel } from '../models/registrar-usuario.view-model';
import { TokenViewModel } from '../models/token.view-model';

@Injectable()
export class AuthService {
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/';

  private endpointRegistrar: string = this.endpoint + 'registrar';

  constructor(private http: HttpClient) {}

  public registrar(
    usuario: RegistrarUsuarioViewModel
  ): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointRegistrar, usuario).pipe(
      map((res) => res.dados),
      catchError((err) => this.processarErroHttp(err))
    );
  }

  private processarErroHttp(erro: HttpErrorResponse) {
    let mensagemErro = '';

    if (erro.status == 0)
      mensagemErro = 'Ocorreu um erro ao processar a requisição.';
    if (erro.status == 401)
      mensagemErro =
        'O usuário não está autorizado. Efetue login e tente novamente.';
    else mensagemErro = erro.error?.erros[0];

    return throwError(() => new Error(mensagemErro));
  }
}
