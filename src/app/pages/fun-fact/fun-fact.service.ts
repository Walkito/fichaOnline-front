import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CFunFact } from 'src/app/class/CFunFact';
import { environment } from 'src/app/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class FunFactService {
  private baseAPI : string = environment.API_PATH;

  constructor(private http: HttpClient,
    private utils: UtilsService,
  ) { }

  getFunFacts(idAccount:number):Observable<CFunFact[]>{
    const params = new HttpParams().set('id', idAccount);

    return this.http.get<CFunFact[]>(`${this.baseAPI}funfact/teste`, {params});
  }

  createFunFacts(funFact: CFunFact):Observable<CFunFact>{
    return this.http.post<CFunFact>(`${this.baseAPI}funfact/create`, funFact);
  }

  editFunFacts(funFact: CFunFact):Observable<CFunFact>{
    return this.http.put<CFunFact>(`${this.baseAPI}funfact/edit`, funFact) ;
  }

  deleteFunFacts(idFunFact: number):Observable<boolean>{
    const params = new HttpParams().set("id", idFunFact);

    return this.http.delete<boolean>(`${this.baseAPI}funfact/delete`, {params});
  }
}
