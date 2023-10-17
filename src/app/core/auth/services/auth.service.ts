import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutenticarUsuarioViewModel } from '../models/autenticar-usuario.view-model';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { TokenViewModel } from '../models/token.view-model';
import { RegistrarUsuarioViewModel } from '../models/registrar-usuario.view-model';
import { UsuarioTokenViewModel } from '../models/usuario-token.view-model';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthService {
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/';
  private endpointLogin: string = this.endpoint + 'autenticar';
  private endpointRegistro: string = this.endpoint + 'registrar';

  private _usuarioAutenticado: BehaviorSubject<
    UsuarioTokenViewModel | undefined
  >;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this._usuarioAutenticado = new BehaviorSubject<
      UsuarioTokenViewModel | undefined
    >(undefined);
  }

  public login(
    usuario: AutenticarUsuarioViewModel
  ): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointLogin, usuario).pipe(
      map((res) => res.dados),
      tap((dados) => this.notificarLogin(dados.usuarioToken)),
      tap((dados) => this.localStorage.salvarDadosLocaisUsuario(dados)),
      catchError((err) => this.processarErro(err))
    );
  }

  public registrar(
    usuario: RegistrarUsuarioViewModel
  ): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointRegistro, usuario).pipe(
      map((res) => res.dados),
      tap((dados) => this.notificarLogin(dados.usuarioToken)),
      tap((dados) => this.localStorage.salvarDadosLocaisUsuario(dados))
    );
  }

  public logout(): Observable<any> {
    return this.http
      .post<any>(this.endpoint + 'sair', {})
      .pipe(tap(() => this.notificarLogout()));
  }

  public logarUsuarioSalvo(): void {
    const dadosSalvos = this.localStorage.obterDadosLocaisSalvos();

    if (!dadosSalvos) return;

    let tokenValido = new Date(dadosSalvos.dataExpiracao) > new Date();

    if (dadosSalvos.usuarioToken && tokenValido)
      this.notificarLogin(dadosSalvos.usuarioToken);
  }

  public usuarioAutenticado(): Observable<UsuarioTokenViewModel | undefined> {
    return this._usuarioAutenticado.asObservable();
  }

  private notificarLogin(usuario: UsuarioTokenViewModel): void {
    return this._usuarioAutenticado.next(usuario);
  }

  private notificarLogout(): void {
    return this._usuarioAutenticado.next(undefined);
  }

  private processarErro(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]));
  }
}
