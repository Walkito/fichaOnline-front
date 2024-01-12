import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CAccount} from '../class/CAccount';
import { CErro } from '../class/CErro';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  private accountInfo: CAccount = new CAccount;
  private sheetId: number = 0;
  private sheetType: number = 1;
  private alertSubject = new Subject<any>();

  showError(error: CErro):string{
    return error.error.mensagem;
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

  getCustomErrorMessage(field: string, error: string, errorValue: any): string {
    switch (error) {
      case 'required':
        return `${field} é obrigatório.`;
      case 'minlength':
        return `${field} deve ter pelo menos ${errorValue.requiredLength} caracteres.`;
      case 'maxlength':
        return `${field} não pode ter mais de ${errorValue.requiredLength} caracteres.`;
      case 'email':
        return 'E-mail inválido.';
      // Adicione mais casos conforme necessário para outros validadores
      default:
        return `Erro no campo ${field}.`;
    }
  }
}
