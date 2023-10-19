import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { LoginModule } from './views/login/login.module';
import { AuthService } from './core/auth/services/auth.service';
import { RegistroModule } from './views/registro/registro.module';
import { httpTokenInterceptor } from './core/auth/interceptors/http-token.interceptor';

function logarUsuarioSalvoFactory(auth: AuthService) {
  return () => auth.logarUsuarioSalvo();
}

@NgModule({
  // Componentes e diretivas que o Módulo Distribui
  declarations: [AppComponent],

  // Importa metadados de outros módulos (incluindo bibliotecas)
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    CoreModule,
    LoginModule,
    RegistroModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: logarUsuarioSalvoFactory,
      deps: [AuthService],
      multi: true,
    },
    provideHttpClient(withInterceptors([httpTokenInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
