import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CRun } from 'src/app/class/CRun';
import { CSystem } from 'src/app/class/CSystem';
import { API_PATH } from 'src/app/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ModalCreateRunService {

  constructor(private http: HttpClient,
    private utils: UtilsService) { }

    private basePath = API_PATH;

    getSystem():Observable<CSystem[]>{
      return this.http.get<CSystem[]>(`${this.basePath}system/systems`);
    }

    registerRun(run: CRun):Observable<CRun>{

      return this.http.post<CRun>(`${this.basePath}run/register`, run);
    }

    linkAccountRun(accountRunDTO: Object):Observable<boolean>{

      return this.http.post<boolean>(`${this.basePath}run/linkAccount`, accountRunDTO);
    }
}
