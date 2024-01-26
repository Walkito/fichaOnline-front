import { Component } from '@angular/core';
import { CAccount } from 'src/app/class/CAccount';
import { LoginService } from '../login/login.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { HomeService } from './home.service';
import { CErro } from 'src/app/class/CErro';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private utils: UtilsService,
    private service: HomeService,
    private sessionStorage: SessionStorageService
  ) { }

  account: CAccount = new CAccount;
  profilePictureURL: string = "";

  async ngOnInit() {
    this.account = this.sessionStorage.getData('account');
    this.profilePictureURL = await this.getProfilePicture();
  }

  async choosePicture(event: any) {
    const file: File = event.target.files[0];
    const fileName: string = file.name;
    const imageData: any = await this.readFile(file);
    const imageSaved = await this.saveImage(imageData, fileName);
    console.log(imageSaved);
    if(imageSaved){
      this.profilePictureURL = await this.getProfilePicture();
    }
  }

  private getProfilePicture():Promise<string>{
    return new Promise<string>(async (resolve, reject)=>{
      const imageValueSession = this.sessionStorage.getData('profileImage');
      console.log(imageValueSession);
      if(imageValueSession === undefined){
        console.log('Entrou aki');
        const blob: Blob = await this.getImage();
        const blobInBase64: string = await this.convertBlobBase64(blob);
        this.sessionStorage.saveData('profileImage', blobInBase64);
        resolve(URL.createObjectURL(blob));
      } else {
        const blob: Blob = await this.convertBase64Blob(imageValueSession);
        resolve(URL.createObjectURL(blob));
      }
    })
  }

private convertBase64Blob(base64: string): Promise<Blob>{
  return new Promise<Blob>((resolve, reject) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for(let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    resolve(new Blob([byteArray], {type: 'image/png'}));
  });
}

  private convertBlobBase64(blob: Blob): Promise<string>{
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          const base64Splited = (reader.result as string).split(',');
          resolve(base64Splited[1]);
        }
      }

      if(blob){
        reader.readAsDataURL(blob);
      }
    });
  }


  private readFile(file: File): Promise<String> {
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

  private saveImage(imageB64: string, fileName: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const imageObject = {
        id: this.account.id,
        imageB64: imageB64,
        fileName: fileName
      };
      this.service.uploadImage(imageObject).subscribe({
        next: (response: boolean) => resolve(response),
        error: (error: CErro) => {
          alert(this.utils.showError(error));
          reject(error);
        }
      })
    });
  }

  private getImage(): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      this.service.downloadImage(this.account.id).subscribe({
        next: (profilePicture: Blob) => resolve(profilePicture),
        error: (error: CErro) => {
          alert(this.utils.showError(error));
          reject(error);
        }
      })
    });
  }
}
