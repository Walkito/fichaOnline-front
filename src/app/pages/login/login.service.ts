import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { API_PATH } from 'src/app/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { UtilsService } from 'src/app/utils/utils.service';
import { CAccount } from 'src/app/class/CAccount';
import { CLogin } from 'src/app/class/CLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private basePath = API_PATH;
  constructor(private http: HttpClient,
              private utils: UtilsService) { }

  doLogin(login:CLogin):Observable<CAccount>{
    return this.http.get<CAccount>(`${this.basePath}account/login?
    user=${login.user}
    &email=${login.email}
    &password=${login.password}
    `);
  }
}
