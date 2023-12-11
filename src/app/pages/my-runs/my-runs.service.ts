import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class MyRunsService {

  constructor(private http:HttpClient,
    private utils:UtilsService) { }


}
