import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { CAccount } from 'src/app/class/CAccount';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {
  private basePath = environment.API_PATH;;

  constructor(private http: HttpClient,
    private utils: UtilsService) { }

  createLogin(account: CAccount) {


    return this.http.post(`${this.basePath}account/create`, account);
  }

  verifyEmailUser(email: string, user: string):Observable<number>{
    const params = new HttpParams()
      .set(`email`, email)
      .set(`user`, user)
      .set(`id`, 0);

    return this.http.get<number>(`${this.basePath}account/verifyEmailUser`, { params });
  }
}
