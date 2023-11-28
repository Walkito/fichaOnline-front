import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { API_PATH } from 'src/app/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { UtilsService } from 'src/app/utils/utils.service';
import { IAccount } from 'src/app/interfaces/IAccount';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private basePath = API_PATH;
  constructor(private http: HttpClient,
              private utils: UtilsService) { }

  doLogin(params: { [key: string]: string}):Observable<IAccount>{
    let paramsToSend = this.utils.createParams(params);

    return this.http.get<IAccount>(`${this.basePath}account/login`, {params: paramsToSend});
  }
}
