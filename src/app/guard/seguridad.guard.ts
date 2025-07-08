import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const seguridadGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  const tokenValido = loginService.verificar();

  if (!tokenValido) {
    alert('Tu sesión ha expirado o el token es inválido. Por favor, inicia sesión nuevamente.');
    router.navigate(['/login']);
    return false;
  }

  return true;
};
