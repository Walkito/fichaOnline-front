import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CAccount } from 'src/app/class/CAccount';
import { CMusic } from 'src/app/class/CMusic';
import { CNpc } from 'src/app/class/CNpc';
import { CPlayerSheet } from 'src/app/class/CPlayerSheet';
import { CRun } from 'src/app/class/CRun';
import { CSheetDnD } from 'src/app/class/sheets/CSheetDnD';
import { API_PATH } from 'src/app/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class MasterRunService {

  constructor(private http: HttpClient, private utils: UtilsService) { }

  private basePath = API_PATH;

  getNpcs(runId: number): Observable<CNpc[]> {
    const params = new HttpParams().set('runId', runId);
    return this.http.get<CNpc[]>(`${this.basePath}npc/npcs`, { params });
  }

  addNpc(npc: CNpc): Observable<CNpc[]> {
    const headers = this.utils.getHeaders();
    return this.http.post<CNpc[]>(`${this.basePath}npc/add`, npc, { headers });
  }

  editNpc(npc: CNpc): Observable<CNpc[]> {
    const headers = this.utils.getHeaders();
    return this.http.put<CNpc[]>(`${this.basePath}npc/edit`, npc, { headers });
  }

  getRun(id: number): Observable<CRun> {
    const params = new HttpParams().set('id', id);
    return this.http.get<CRun>(`${this.basePath}run`, { params });
  }

  saveRun(run: CRun): Observable<CRun> {
    const headers = this.utils.getHeaders();
    return this.http.put<CRun>(`${this.basePath}run/edit`, run, { headers });
  }

  deleteRun(idRun: number): Observable<boolean> {
    const params = new HttpParams().set('idRun', idRun);
    return this.http.delete<boolean>(`${this.basePath}run/delete`, { params });
  }

  getLinkedAccounts(runId: number): Observable<CAccount[]> {
    const params = new HttpParams().set('idRun', runId);
    return this.http.get<CAccount[]>(`${this.basePath}run/linkedAccounts`, { params });
  }

  linkAccount(runAccountDTO: Object): Observable<boolean> {
    const headers = this.utils.getHeaders();
    return this.http.post<boolean>(`${this.basePath}run/linkAccount`, runAccountDTO, { headers });
  }

  unlinkAccount(runAccountDTO: any): Observable<boolean> {
    const params = new HttpParams()
      .set('idRun', runAccountDTO.idRun)
      .set('idAccount', runAccountDTO.idAccount);
    return this.http.delete<boolean>(`${this.basePath}run/unlinkAccount`, { params });
  }

  getDnD5eSheets(ids: number[]): Observable<CSheetDnD[]>{
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('ids', id.toString());
    });
    return this.http.get<CSheetDnD[]>(`${this.basePath}sheetDnD/sheets`, { params });
  }

  getPlayerSheets(idRun: number): Observable<CPlayerSheet[]> {
    const params = new HttpParams()
    .set('idRun', idRun);
    return this.http.get<CPlayerSheet[]>(`${this.basePath}playerSheet/get`, { params});
  }

  registerMusic(music: CMusic): Observable<CMusic> {
    const headers = this.utils.getHeaders();
    return this.http.post<CMusic>(`${this.basePath}musics/register`, music, { headers });
  }

  deleteMusic(id: number): Observable<boolean> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<boolean>(`${this.basePath}musics/delete`, { params });
  }
}
