import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CAccount} from '../class/CAccount';
import { CErro } from '../class/CErro';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  private accountInfo: CAccount = new CAccount;
  private sheetId: number = 0;
  private sheetType: number = 1;

  showError(error: CErro){
    alert(`Mensagem: ` + error.error.mensagem);
  }

  setTemporaryAccountInfos(account: CAccount){
    this.accountInfo = account;
  }

  getTemporaryAccountInfos(){
    return this.accountInfo;
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append("Content-Type", "application/json")
  }

  setSheetId(id: number){
    this.sheetId = id;
  }

  getSheetId(){
    return this.sheetId;
  }

  setSheetType(value: number){
    this.sheetType = value;
  }

  getSheetType(){
    return this.sheetType;
  }
}
