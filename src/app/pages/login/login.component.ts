import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { Router } from '@angular/router';
import { CLogin } from 'src/app/class/CLogin';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from '../sheet/modal-error/modal-error.component';
import { ModalErrorLoginComponent } from './modal-error-login/modal-error-login.component';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { CAccount } from 'src/app/class/CAccount';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login: CLogin = new CLogin();
  private token: String = "";
  user: string = "";
  password: string = "";

  constructor(private service: LoginService,
    private utils: UtilsService,
    private router: Router,
    private dialog: MatDialog,
    private sessionStorage: SessionStorageService) { }


  getToken() {
    this.service.getToken(this.login).subscribe({
      next: (loginResponse: CLogin) => {
        this.sessionStorage.saveData('account', loginResponse.account);
        this.sessionStorage.saveData('accountRole', loginResponse.account.role);
        this.sessionStorage.saveData('userToken', loginResponse.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        const dialogRef = this.dialog.open(ModalErrorLoginComponent, {
          data: { error: this.utils.showError(error) },
          disableClose: true,
        })
      }
    })
  }
}

