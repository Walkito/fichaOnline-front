import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { CAccount } from 'src/app/class/CAccount';
import { LoginService } from '../login/login.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { HomeService } from './home.service';
import { CErro } from 'src/app/class/CErro';
import { HttpResponse } from '@angular/common/http';
;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private utils: UtilsService,
    private service: HomeService,
    private sessionStorage: SessionStorageService,
    private router: Router,
  ) { }


  @ViewChild('treeDiv') treeDiv!: ElementRef;

  account: CAccount = new CAccount;
  roleNumber: string = '';
  profilePictureURL: string = "assets/iconeUsuario.png";
  accountRole: string = "";
  mobile: boolean = false;

  async ngOnInit() {
    this.account = this.sessionStorage.getData('account');
    this.roleNumber = this.sessionStorage.getData('accountRole');
    this.profilePictureURL = await this.getProfilePicture();

    this.mobile = window.innerWidth <= 430 ? true : false;
  }

  async choosePicture(event: any) {
    const file: File = event.target.files[0];
    const fileName: string = file.name;
    const imageData: any = await this.utils.readFile(file);
    const imageSaved: boolean = await this.saveImage(imageData, fileName);
    if (imageSaved) {
      this.sessionStorage.saveData('profileImage', '');
      this.profilePictureURL = await this.getProfilePicture();
    } else {
      alert("Já existe um arquivo com este mesmo nome. Por favor, renomeie com um nome de arquivo não utilizado.");
    }
  }

  exit() {
    this.sessionStorage.clearAll();
    this.router.navigate(['/']);
  }

  openMenu() {
    this.treeDiv.nativeElement.style.animation = 'treeApper2 1s forwards';
    this.treeDiv.nativeElement.style.display = 'flex';
  }

  closeMenu() {
    this.treeDiv.nativeElement.style.animation = 'treeDisapper 1s forwards';
  }

  private getProfilePicture(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const imageValueSession = this.sessionStorage.getData('profileImage');
      if (imageValueSession === "") {
        try {
          const blob: Blob = await this.getImage();
          const blobInBase64: string = await this.utils.convertBlobBase64(blob);
          this.sessionStorage.saveData('profileImage', blobInBase64);
          resolve(URL.createObjectURL(blob));
        } catch (error: any) {
          console.log(error);
          resolve("assets/iconeUsuario.png");
        }
      } else {
        const blob: Blob = await this.utils.convertBase64Blob(imageValueSession);
        resolve(URL.createObjectURL(blob));
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
          this.utils.showError(error);
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
          reject(error);
        }
      })
    });
  }

}
