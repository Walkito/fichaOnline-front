import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/app/environments/environment';
import { CAccount} from 'src/app/class/CAccount';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {
  constructor(private http: HttpClient, private utils: UtilsService) { }

  private basePath = API_PATH;

  editAccount(updateAccount: CAccount):Observable<CAccount>{
    return this.http.put<CAccount>(`${this.basePath}account/edit`, updateAccount);
  }

  getAccountInfos(id: number):Observable<CAccount>{
    const params = new HttpParams()
      .set(`id`, id);

      return this.http.get<CAccount>(`${this.basePath}account/accountInfos`, { params })
  }

  verifyEmailUser(email: string, user: string, id: number):Observable<number>{
    const params = new HttpParams()
      .set(`email`, email)
      .set(`user`, user)
      .set(`id`, id)

    return this.http.get<number>(`${this.basePath}account/verifyEmailUser`, { params });
  }

  deleteAccount(id: number):Observable<number>{
    const params = new HttpParams()
      .set(`idAccount`, id);

      return this.http.delete<number>(`${this.basePath}account/delete`, { params });
  }
}
