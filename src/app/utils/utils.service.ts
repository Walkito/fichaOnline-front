import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { CAccount } from '../class/CAccount';
import { CErro } from '../class/CErro';
import { Subject } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private sessionStorage: SessionStorageService) { }

  private accountType: string = this.sessionStorage.getData('accountRole');

  showError(error: CErro): string {
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

  getAccountType() {
    return this.accountType;
  }

  readFile(file: File): Promise<String> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          const base64Splited = (reader.result as string).split(',');
          resolve(base64Splited[1]);
        }
      }

      reader.onerror = () => {
        reject(reader.error);
      }
      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }

  convertBase64Blob(base64: string): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      resolve(new Blob([byteArray], { type: 'image/png' }));
    });
  }

  convertBlobBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          const base64Splited = (reader.result as string).split(',');
          resolve(base64Splited[1]);
        }
      }

      if (blob) {
        reader.readAsDataURL(blob);
      }
    });
  }

  userLogged(): boolean{
    let session = this.sessionStorage.getData('userToken')!= '' ? true : false;
    return  session;
  }

  userRole(roles: string): boolean{
    const roleNumber: string = this.sessionStorage.getData('accountRole');
    const role: string = roleNumber === '62' ? 'MASTER' : 'PLAYER';

    return roles.includes(role);
  }
}
