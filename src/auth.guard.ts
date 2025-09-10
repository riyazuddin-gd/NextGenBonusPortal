import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FboService } from './services/fbo.service';

export const authGuard: CanActivateFn = () => {
  const fboService = inject(FboService);
  const router = inject(Router);

  if (fboService.currentFbo()) {
    return true;
  }

  // Redirect to the login page if not logged in
  return router.parseUrl('/');
};
