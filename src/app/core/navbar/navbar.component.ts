import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  estaColapsada: boolean = true;
  usuarioAutenticado$?: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.usuarioAutenticado$ = this.authService
      .usuarioAutenticado()
      .pipe(map((usuario) => (usuario ? true : false)));
  }
}
