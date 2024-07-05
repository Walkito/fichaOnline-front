import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  saveData(key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getData(key: string): any{
    const object = sessionStorage.getItem(key);
    if(object != undefined && object != null && object != ""){
      return JSON.parse(object);
    } else {
      return "";
    }
  }

  removeData(key: string){
    sessionStorage.removeItem(key);
  }

  clearAll(){
    sessionStorage.clear();
  }
}
