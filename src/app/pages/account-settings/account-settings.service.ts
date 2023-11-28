import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/app/environments/environment';
import { IAccount } from 'src/app/interfaces/IAccount';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {
  constructor(private http: HttpClient) { }

  private basePath = API_PATH;


  editAccount(updateAccount: IAccount):Observable<IAccount>{
    return this.http.put<IAccount>(`${this.basePath}account/edit`, updateAccount);
  }

}
