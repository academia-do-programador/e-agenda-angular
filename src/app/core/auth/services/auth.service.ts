import { TokenViewModel } from './../models/token.view-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { RegistrarUsuarioViewModel } from '../models/registrar-usuario.view-model';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthService {
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/';

  private endpointRegistrar: string = this.endpoint + 'registrar';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  public registrar(
    usuario: RegistrarUsuarioViewModel
  ): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointRegistrar, usuario).pipe(
      // Mapeio a resposta completa para retornar apenas os dados
      map((res) => res.dados),

      // Obter o retorno do map e salvar no local-storage
      tap((dados: TokenViewModel) =>
        this.localStorage.salvarDadosLocaisUsuario(dados)
      ),
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