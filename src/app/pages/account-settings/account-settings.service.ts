import { HttpClient, HttpHeaders} from '@angular/common/http';
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
    const headers = this.utils.getHeaders();
    return this.http.put<CAccount>(`${this.basePath}account/edit`, updateAccount, {headers});
  }

}
