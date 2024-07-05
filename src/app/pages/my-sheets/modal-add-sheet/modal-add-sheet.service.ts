import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CAccount } from 'src/app/class/CAccount';
import { CRun } from 'src/app/class/CRun';
import { API_PATH } from 'src/app/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ModalAddSheetService {

  constructor(private http: HttpClient,
    private utils: UtilsService) { }

    private basePath = API_PATH;

    getAllRunsFiltered(filter: string[], accountId: number):Observable<CRun[]>{
      const params = new HttpParams()
      .set('filter', filter.join(','))
      .set('accountID', accountId);

      return this.http.get<CRun[]>(`${this.basePath}run/runsFiltered`, { params });
    }

    getMasterRun(id: number):Observable<CRun>{
      const params = new HttpParams()
      .set('id', id);

      return this.http.get<CRun>(`${this.basePath}run/getMaster`, { params });
    }
}
