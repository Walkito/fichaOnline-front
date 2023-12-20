import { CRun } from './../../class/CRun';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/utils/utils.service';
import { API_PATH } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyRunsService {

  constructor(private http:HttpClient,
    private utils:UtilsService) { }


  private basePath = API_PATH;

  getLinkedRuns(idAccount:number):Observable<CRun[]>{
    const params = new HttpParams()
      .set('idAccount', idAccount);

    return this.http.get<CRun[]>(`${this.basePath}account/linkedRuns`,{params});
  }
}
