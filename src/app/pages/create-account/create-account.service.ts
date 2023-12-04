import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/app/environments/environment';
import { CAccount } from 'src/app/class/CAccount';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {
  private basePath = API_PATH;

  constructor(private http:HttpClient,
              private utils:UtilsService) { }



  createLogin(account:CAccount){
    const headers = this.utils.getHeaders();

    return this.http.post(`${this.basePath}account/create`, account, {headers});
  }
}
