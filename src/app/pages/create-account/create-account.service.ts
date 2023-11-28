import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/app/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {
  private basePath = API_PATH;

  constructor(private http:HttpClient,
              private utils:UtilsService) { }

  createLogin(params: { [key: string]: string}){
    let bodyToSend = this.utils.createParams(params);

    return this.http.post(`${this.basePath}account/create`, bodyToSend);
  }           
}
