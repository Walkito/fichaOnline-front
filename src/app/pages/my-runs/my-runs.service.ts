import { CRun } from './../../class/CRun';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/utils/utils.service';
import { environment } from 'src/app/environments/environment';
import { CPlayerSheet } from 'src/app/class/CPlayerSheet';
import { CAccount } from 'src/app/class/CAccount';

@Injectable({
  providedIn: 'root'
})
export class MyRunsService {

  constructor(private http:HttpClient,
    private utils:UtilsService) { }


  private basePath = environment.API_PATH;;

  getLinkedRuns(idAccount:number):Observable<CRun[]>{
    const params = new HttpParams()
      .set('idAccount', idAccount);

    return this.http.get<CRun[]>(`${this.basePath}account/linkedRuns`,{params});
  }

  getSheets(idRun: number):Observable<CPlayerSheet[]>{
    const params = new HttpParams()
    .set('idRun', idRun);

    return this.http.get<CPlayerSheet[]>(`${this.basePath}playerSheet/get`, {params});
  }

  getLinkedAccounts(idRun:number):Observable<CAccount[]>{
    const params = new HttpParams()
    .set('idRun', idRun);

    return this.http.get<CAccount[]>(`${this.basePath}run/linkedAccounts`, {params});
  }

  getMasterRun(id: number):Observable<CRun>{
    const params = new HttpParams()
    .set('id', id);

    return this.http.get<CRun>(`${this.basePath}run/getMaster`, {params});
  }
}
