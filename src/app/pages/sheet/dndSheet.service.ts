import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
