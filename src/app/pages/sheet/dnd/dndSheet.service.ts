import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CPlayerSheet } from 'src/app/class/CPlayerSheet';
import { CSheetDnD } from 'src/app/class/sheets/CSheetDnD';
import { API_PATH } from 'src/app/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor(private http: HttpClient, private utils: UtilsService) { }

  private basePath = API_PATH;

  getSheet(id: number):Observable<CSheetDnD>{
    const params = new HttpParams().set("id", id);

    return this.http.get<CSheetDnD>(`${this.basePath}sheetDnD`, {params});
  }

  editSheet(sheetDnD: CSheetDnD):Observable<CSheetDnD>{
    const headers = this.utils.getHeaders();
    return this.http.put<CSheetDnD>(`${this.basePath}sheetDnD/edit`, sheetDnD, {headers});
  }

  postSheet(sheetDnD: CSheetDnD):Observable<CSheetDnD>{
    const headers = this.utils.getHeaders();
    return this.http.post<CSheetDnD>(`${this.basePath}sheetDnD/create`, sheetDnD, {headers});
  }

  updateAttributesInCreation(sheetDnD: CSheetDnD):Observable<CSheetDnD>{
    const headers = this.utils.getHeaders();
    return this.http.post<CSheetDnD>(`${this.basePath}sheetDnD/create/updateAttributes`, sheetDnD, {headers});
  }

  linkSheet(sheet: CPlayerSheet):Observable<boolean>{
    const headers = this.utils.getHeaders();
    return this.http.post<boolean>(`${this.basePath}playerSheet/linkSheet`, sheet, {headers});
  }
}
