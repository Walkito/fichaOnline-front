import { Component, HostListener, OnInit } from '@angular/core';
import { CreateAccountService } from './create-account.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/utils/utils.service';
import { CAccount } from 'src/app/class/CAccount';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorCreateAccountComponent } from './modal-error-create-account/modal-error-create-account.component';
import { Observable } from 'rxjs';
import { CErro } from 'src/app/class/CErro';
import { ModalSucessCreateAccountComponent } from './modal-sucess-create-account/modal-sucess-create-account.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  account: CAccount = new CAccount();
  emailErrorMessage: string = ``;
  userErrorMessage: string = ``;

  constructor(private service: CreateAccountService,
    private utils: UtilsService,
    private router: Router,
    private dialog: MatDialog) { }

  async createAccount(form: NgForm) {
    const validEmailNumber = await this.verifyEmailAndUser(form.value.email, form.value.username);
    if(validEmailNumber){
      form.form.setErrors({'emailUserInvalid': true});
    }
    if (form.valid) {
      this.service.createLogin(this.account).subscribe({
        next: () => {
          this.router.navigate(["/"]);
          this.dialog.open(ModalSucessCreateAccountComponent,{
            disableClose: true,
          })
        },
        error: (error: CErro) => alert(this.utils.showError(error))
      });
    } else {
      this.dialog.open(ModalErrorCreateAccountComponent, {
        disableClose: true,
      })
    }
  }

  private verifyEmailAndUser(email: string, user: string): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this.service.verifyEmailUser(email, user).subscribe({
        next: (response: number) => {
          this.emailErrorMessage = "";
          this.userErrorMessage = "";
          const valid = this.setUserAndEmailErrors(response);
          resolve(valid);
        },
        error: (error: CErro) => {
          alert(this.utils.showError(error));
          reject(error);
        }
      })
    });
  }

  private setUserAndEmailErrors(response: number): boolean {
    switch (response) {
      case 1:
        this.emailErrorMessage = `E-mail já utilizado`;
        this.userErrorMessage = `Usuário já utilizado`;
        return true;
      case 2:
        this.emailErrorMessage = `E-mail já utilizado`;
        return true;
      case 3:
        this.userErrorMessage = `Usuário já utilizado`;
        return true;
      case 4:
        this.emailErrorMessage = `E-mail não é válido`;
        return true;
      }
    return false;
  }
}
