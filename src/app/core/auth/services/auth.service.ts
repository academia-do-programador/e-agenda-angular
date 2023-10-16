import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutenticarUsuarioViewModel } from '../models/autenticar-usuario.view-model';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { TokenViewModel } from '../models/token.view-model';
import { RegistrarUsuarioViewModel } from '../models/registrar-usuario.view-model';
import { UsuarioTokenViewModel } from '../models/usuario-token.view-model';

@Injectable()
export class AuthService {
  private endpoint: string = 'https://e-agenda-web-api.onrender.com/api/conta/';
  private endpointLogin: string = this.endpoint + 'autenticar';
  private endpointRegistro: string = this.endpoint + 'registrar';

  private _usuarioAutenticado: BehaviorSubject<
    UsuarioTokenViewModel | undefined
  >;

  constructor(private http: HttpClient) {
    this._usuarioAutenticado = new BehaviorSubject<
      UsuarioTokenViewModel | undefined
    >(undefined);
  }

  public login(
    usuario: AutenticarUsuarioViewModel
  ): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointLogin, usuario).pipe(
      map((res) => res.dados),
      tap((dados) => this.notificarLogin(dados.usuarioToken))
    );
  }

  public registrar(
    usuario: RegistrarUsuarioViewModel
  ): Observable<TokenViewModel> {
    return this.http.post<any>(this.endpointRegistro, usuario).pipe(
      map((res) => res.dados),
      tap((dados) => this.notificarLogin(dados.usuarioToken))
    );
  }

  public logout() {
    return this.http
      .post(this.endpoint + 'sair', {})
      .pipe(tap(() => this.notificarLogout()));
  }

  public usuarioAutenticado(): Observable<UsuarioTokenViewModel | undefined> {
    return this._usuarioAutenticado.asObservable();
  }

  private notificarLogin(usuario: UsuarioTokenViewModel) {
    return this._usuarioAutenticado.next(usuario);
  }

  private notificarLogout() {
    return this._usuarioAutenticado.next(undefined);
  }
}
