import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CAccount } from 'src/app/class/CAccount';
import { environment } from 'src/app/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ModalAddPlayerService {

  constructor(private http: HttpClient,
    private utils: UtilsService) { }

    private basePath = environment.API_PATH;;

    getAccount(user: string):Observable<CAccount>{
      const params = new HttpParams().set('user', user);
      return this.http.get<CAccount>(`${this.basePath}account/accountInfos/user`, {params});
    }
}
