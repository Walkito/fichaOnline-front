import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CPlayerSheet } from 'src/app/class/CPlayerSheet';
import { CSheetDnD } from 'src/app/class/sheets/CSheetDnD';
import { environment } from 'src/app/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class DnDSheetService {

  constructor(private http: HttpClient, private utils: UtilsService) { }

  private basePath = environment.API_PATH;

  getSheet(id: number):Observable<CSheetDnD>{
    const params = new HttpParams().set("id", id);
    return this.http.get<CSheetDnD>(`${this.basePath}sheetDnD`, {params});
  }

  getCharacterPicture(id: number):Observable<Blob>{
    const params = new HttpParams().set("id", id);
    return this.http.get<Blob>(`${this.basePath}sheetDnD/characterPicture`, {
      params,
      responseType: 'blob' as 'json',
    });
  }

  editSheet(sheetDnD: CSheetDnD):Observable<CSheetDnD>{

    return this.http.put<CSheetDnD>(`${this.basePath}sheetDnD/edit`, sheetDnD);
  }

  postSheet(sheetDnD: CSheetDnD):Observable<CSheetDnD>{

    return this.http.post<CSheetDnD>(`${this.basePath}sheetDnD/create`, sheetDnD);
  }

  uploadCharacterPicture(image: Object):Observable<boolean>{

    return this.http.post<boolean>(`${this.basePath}sheetDnD/uploadCharacterPicture`, image);
  }

  updateAttributesInCreation(sheetDnD: CSheetDnD):Observable<CSheetDnD>{

    return this.http.post<CSheetDnD>(`${this.basePath}sheetDnD/create/updateAttributes`, sheetDnD);
  }

  linkSheet(sheet: CPlayerSheet):Observable<boolean>{

    return this.http.post<boolean>(`${this.basePath}playerSheet/linkSheet`, sheet);
  }
}
