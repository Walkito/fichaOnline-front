import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CRun } from 'src/app/class/CRun';
import { environment } from 'src/app/environments/environment';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class MasterAreaService {

  constructor(private http: HttpClient, private utils: UtilsService) { }

  private basePath = environment.API_PATH;;

}
