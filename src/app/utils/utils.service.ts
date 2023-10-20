import { Injectable } from '@angular/core';
import { IErro } from '../interfaces/IErro';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  showError(error:IErro){
    if(error.error.errors != undefined){
      alert(error.error.errors[0].field + ' ' + error.error.errors[0].defaultMessage);
    } else if('message' in error.error){
      alert(error.error.message);
    } else{
      alert(error);
    }
  }
}
