import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UtilsService } from './utils.service';

export const guardianGuard: CanActivateFn = (route, state) => {

  const userLogged: boolean = inject(UtilsService).userLogged();

  const authRoles: any = JSON.parse(JSON.stringify(route.data)).role.toString();

  const role: boolean = inject(UtilsService).userRole(authRoles);

  return userLogged && role ? true : inject(Router).navigate(["login"]);
};
