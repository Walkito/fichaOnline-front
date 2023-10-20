import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { API_PATH } from 'src/app/environments/environment';
import { IAccount } from 'src/app/interfaces/IAccount';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private basePath = API_PATH;
  constructor(private http: HttpClient) { }

  doLogin(params: { [key: string]: string}): Observable<IAccount>{
    let paramsToSend = this.createParams(params);

    return this.http.get<IAccount>(`${this.basePath}account/login`, {params: paramsToSend});
  }

  createParams(params: { [key: string]: string}): HttpParams{
    let paramsArr = new HttpParams();
    for (const key in params){
      if (params.hasOwnProperty(key)) {
        paramsArr = paramsArr.set(key, params[key]);
      }
    }
    return paramsArr;
  }
}
