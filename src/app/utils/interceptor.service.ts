import { UtilsService } from 'src/app/utils/utils.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { API_PATH } from '../environments/environment-prod';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';
import { ModalErrorTokenComponent } from './modal-error-token/modal-error-token/modal-error-token.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private dialog: MatDialog) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = inject(SessionStorageService).getData('userToken');

    if (token === null || token == "") {
      return next.handle(request);
    }

    const autorization = 'Bearer ' + token;

    const autRequ = request.clone({
      headers: request.headers.set('Authorization', autorization)
    });

    return next.handle(autRequ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.dialog.open(ModalErrorTokenComponent, {
            data: { error: "Seu acesso está proibido para esta página."},
            disableClose: true
          });
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
