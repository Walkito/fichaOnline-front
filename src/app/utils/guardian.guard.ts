import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilsService } from './utils.service';

export const guardianGuard: CanActivateFn = (route, state) => {

  const userLogged = inject(UtilsService).userLogged();

  return userLogged ? true : inject(Router).navigate(["login"]);
};
