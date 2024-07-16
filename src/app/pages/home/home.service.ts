import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient,
    private utils: UtilsService) { }

  private basePath = environment.API_PATH;;

  uploadImage(image: object): Observable<boolean> {


    return this.http.post<boolean>(`${this.basePath}account/upload`, image);
  }

  downloadImage(id: number): Observable<Blob> {
    const params = new HttpParams()
      .set('id', id);

    return this.http.get<Blob>(`${this.basePath}account/download`, {
      params,
      responseType: 'blob' as 'json',
    });
  }
}
