import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_PATH } from 'src/app/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { UtilsService } from 'src/app/utils/utils.service';
import { CAccount } from 'src/app/class/CAccount';
import { CLogin } from 'src/app/class/CLogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private basePath = API_PATH;
  constructor(private http: HttpClient,
    private utils: UtilsService,
  private router: Router) { }

  getToken(login: CLogin): Observable<CLogin> {
    return this.http.post<CLogin>(`${this.basePath}account/authLogin`, login);
  }
}
