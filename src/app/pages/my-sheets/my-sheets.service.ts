import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CPlayerSheet } from 'src/app/class/CPlayerSheet';
import { API_PATH } from 'src/app/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class MySheetsService {
  constructor(private http:HttpClient,
    private utils:UtilsService) { }

  private basePath = API_PATH;

  getSheets(idAccount:Number, idRun:Number):Observable<CPlayerSheet[]>{
    const params = new HttpParams()
      .set('idAccount', idAccount.toString())
      .set('idRun', idRun.toString());

    return this.http.get<CPlayerSheet[]>(`${this.basePath}playerSheet/get`, {params});
  }

  deleteSheet(sheetId: number):Observable<boolean>{
    const params = new HttpParams()
      .set('idSheet', sheetId.toString());

    return this.http.delete<boolean>(`${this.basePath}playerSheet/delete`, {params});
  }
}
