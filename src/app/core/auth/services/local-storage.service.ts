import { Injectable } from '@angular/core';
import { TokenViewModel } from '../models/token.view-model';

@Injectable()
export class LocalStorageService {
  private chave: string = 'e-agenda-dados';

  public salvarDadosLocaisUsuario(resposta: TokenViewModel): void {
    const jsonString = JSON.stringify(resposta);

    localStorage.setItem(this.chave, jsonString);
  }

  public obterDadosLocaisSalvos(): TokenViewModel | undefined {
    const jsonString = localStorage.getItem(this.chave);

    if (jsonString) return JSON.parse(jsonString) as TokenViewModel;

    return undefined;
  }
}
