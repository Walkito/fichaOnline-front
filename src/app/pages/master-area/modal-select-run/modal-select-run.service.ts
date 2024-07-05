import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CRun } from 'src/app/class/CRun';
import { API_PATH } from 'src/app/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ModalSelectRunService {

  constructor(private http: HttpClient, private utils: UtilsService) { }

  private basePath = API_PATH;

  getMasterRuns(masterId: number):Observable<CRun[]>{
    const params = new HttpParams().set('id', masterId);

    return this.http.get<CRun[]>(`${this.basePath}run/masterRuns`,{params});
  }
}
