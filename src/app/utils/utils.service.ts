import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CAccount} from '../class/CAccount';
import { CErro } from '../class/CErro';
import { Subject } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private sessionStorage: SessionStorageService) { }

  private accountType: string = this.sessionStorage.getData('accountType');

  showError(error: CErro):string{
    return error.error.mensagem;
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append("Content-Type", "application/json")
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

  getAccountType(){
    return this.accountType;
  }
}
