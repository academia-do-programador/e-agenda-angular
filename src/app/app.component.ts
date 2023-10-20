import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { LoadingService } from './core/loading/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  estaCarregando$?: Observable<boolean>;

  constructor(private router: Router, private loadingService: LoadingService) {
    this.router.events.subscribe((routerEvent: Event) =>
      this.atualizarStatusCarregamento(routerEvent)
    );
  }

  ngOnInit(): void {
    this.estaCarregando$ = this.loadingService.estaCarregando;
  }

  atualizarStatusCarregamento(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loadingService.carregar();
    } else if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loadingService.parar();
    }
  }
}
