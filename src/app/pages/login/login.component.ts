import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { Router } from '@angular/router';
import { CLogin } from 'src/app/class/CLogin';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from '../sheet/modal-error/modal-error.component';
import { ModalErrorLoginComponent } from './modal-error-login/modal-error-login.component';
import { SessionStorageService } from 'src/app/utils/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

login : CLogin = new CLogin();

constructor(private service:LoginService,
            private utils:UtilsService,
            private router:Router,
            private dialog: MatDialog,
            private sessionStorage: SessionStorageService){}


async doLogin(){
  this.service.doLogin(this.login).subscribe({
    next: (account) =>{
      this.sessionStorage.saveData('account', account);
      this.sessionStorage.saveData('accountType', account.type);
      this.router.navigate(['/home']);
    },
    error: (error) => {
      const dialogRef = this.dialog.open(ModalErrorLoginComponent,{
        data: {error: this.utils.showError(error)},
        disableClose: true,
      })
    }
  })
}
}
