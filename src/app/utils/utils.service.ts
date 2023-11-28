import { Injectable } from '@angular/core';
import { IErro } from '../interfaces/IErro';
import { HttpParams } from '@angular/common/http';
import { IAccount } from '../interfaces/IAccount';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  private accountInfo: IAccount = {
    id : "",
    user : "",
    name : "",
    lastName : "",
    email : "",
    password : "",
    type : ""
  };

  showError(error:IErro){
    alert(`Mensagem: ` + error.error.mensagem);
  }

  createParams(params: { [key: string]: string}): HttpParams{
    let paramsArr = new HttpParams();
    for (const key in params){
      if (params.hasOwnProperty(key)) {
        paramsArr = paramsArr.set(key, params[key]);
      }
    }
    return paramsArr;
  }

  setTemporaryAccountInfos(account: IAccount){
    this.accountInfo = account;
  }

  getTemporaryAccountInfos(){
    return this.accountInfo;
  }
}
