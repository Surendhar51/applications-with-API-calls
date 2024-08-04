import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService:AuthService = inject(AuthService);
  const router:Router = inject(Router);

  if(authService.isLoggedIn()){
    return true;
  }
  else{
    router.navigateByUrl("/auth/login");
    return false;
  }
};
