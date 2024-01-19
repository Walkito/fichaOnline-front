import { ModalErrorEditAccountComponent } from './modal-error-edit-account/modal-error-edit-account.component';
import { ModalSucessEditAccountComponent } from './modal-sucess-edit-account/modal-sucess-edit-account.component';
import { Component } from '@angular/core';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CAccount} from 'src/app/class/CAccount';
import { AccountSettingsService } from './account-settings.service';
import { NgForm } from '@angular/forms';
import { CErro } from 'src/app/class/CErro';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  constructor(private service:AccountSettingsService,
    private utils:UtilsService,
    private router:Router,
    private dialog:MatDialog){}

  account: CAccount = new CAccount();
  private actualEmail : string = "";
  private actualUser : string = "";
  emailErrorMessage: string = "";
  userErrorMessage: string = "";

  ngOnInit(){
    this.account = this.utils.getTemporaryAccountInfos();
    this.account.password = "";
    this.actualEmail = this.account.email;
    this.actualUser = this.account.user;
  }

  async editAccount(form: NgForm){
    const validUserEmail = await this.verifyEmailAndUser(form.value.email, form.value.username);
    if(validUserEmail){
      form.form.setErrors({'emailUserInvalid': true});
    }
    if(form.valid){
      this.service.editAccount(this.account).subscribe({
        next: () => {
          this.router.navigate(["home"])
          this.dialog.open(ModalSucessEditAccountComponent, {
            disableClose: true
          })
        },
        error: (error => this.utils.showError(error))
      });
    } else {
      this.dialog.open(ModalErrorEditAccountComponent,{
        disableClose: true
      })
    }
  }

  private verifyEmailAndUser(email: string, user: string): Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      console.log("Email Atual: " + this.actualEmail);
      console.log("Usuario Atual: " + this.actualUser);
      console.log("Email enviado: " + email);
      console.log("Usuario enviado: " + user);

      email = email === this.actualEmail ? "emailNunca@gmail.com" : email;
      user = user === this.actualUser ? "" : user;

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
