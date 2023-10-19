import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpTokenInterceptor } from './interceptors/http-token.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, LocalStorageService],
})
export class AuthModule {}
