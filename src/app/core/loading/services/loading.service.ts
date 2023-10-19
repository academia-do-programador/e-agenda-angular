import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

@Injectable()
export class LoadingService {
  private carregando$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  get estaCarregando() {
    return this.carregando$.asObservable();
  }

  public carregar() {
    this.carregando$.next(true);
  }

  public parar() {
    this.carregando$.next(false);
  }
}
