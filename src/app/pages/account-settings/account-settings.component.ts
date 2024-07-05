import { ModalErrorEditAccountComponent } from './modal-error-edit-account/modal-error-edit-account.component';
import { ModalSucessEditAccountComponent } from './modal-sucess-edit-account/modal-sucess-edit-account.component';
import { Component } from '@angular/core';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CAccount } from 'src/app/class/CAccount';
import { AccountSettingsService } from './account-settings.service';
import { NgForm } from '@angular/forms';
import { CErro } from 'src/app/class/CErro';
import { MatDialog } from '@angular/material/dialog';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { ModalConfirmDeleteAccountComponent } from './modal-confirm-delete-account/modal-confirm-delete-account.component';
import { ModalSucessDeleteAccountComponent } from './modal-sucess-delete-account/modal-sucess-delete-account.component';
import { ModalErrorDeleteAccountComponent } from './modal-error-delete-account/modal-error-delete-account.component';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  constructor(private service: AccountSettingsService,
    private utils: UtilsService,
    private router: Router,
    private dialog: MatDialog,
    private sessionStorage: SessionStorageService) { }

  account: CAccount = new CAccount();
  private actualEmail: string = "";
  private actualUser: string = "";
  emailErrorMessage: string = "";
  userErrorMessage: string = "";

  async ngOnInit() {
    this.account = this.sessionStorage.getData('account');
    this.account = await this.getAccountInfos();
    this.actualEmail = this.account.email;
    this.actualUser = this.account.user;
  }

  getAccountInfos(): Promise<CAccount> {
    return new Promise<CAccount>((resolve, reject) => {
      this.service.getAccountInfos(this.account.id).subscribe({
        next: (account: CAccount) => resolve(account),
        error: (error: CErro) => {
          this.utils.showError(error);
          reject(error);
        }
      });
    });
  }

  async editAccount(form: NgForm) {
    const validUserEmail = await this.verifyEmailAndUser(form.value.email, form.value.username, this.account.id);
    if (validUserEmail) {
      form.form.setErrors({ 'emailUserInvalid': true });
    }
    if (form.valid) {
      this.account.role = this.sessionStorage.getData("accountRole") === '62' ? 'MASTER' : 'PLAYER';
      this.account.situation = 'A';
      this.service.editAccount(this.account).subscribe({
        next: () => {
          this.router.navigate(["home"]);
          this.dialog.open(ModalSucessEditAccountComponent, {
            disableClose: true
          })
        },
        error: (error => this.utils.showError(error))
      });
    } else {
      this.dialog.open(ModalErrorEditAccountComponent, {
        disableClose: true
      })
    }
  }

  deleteAccount() {
    this.dialog.open(ModalConfirmDeleteAccountComponent, {
      disableClose: true
    }).afterClosed().subscribe({
      next: async (option: number) => {
        if (option === 1) {
          const response = await this.accountDelete(this.account.id);
          this.showSucessDialog(response);
        }
      },
      error: (error: CErro) => {
        this.dialog.open(ModalErrorDeleteAccountComponent, {
          disableClose: true,
          data: { error: error }
        });
      }
    });

  }

  showSucessDialog(response: number) {
    this.dialog.open(ModalSucessDeleteAccountComponent, {
      disableClose: true,
      data: { value: response }
    })
    this.router.navigate(['/']);
  }

  private accountDelete(id: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.service.deleteAccount(id).subscribe({
        next: (response: number) => resolve(response),
        error: (error: CErro) => {
          this.utils.showError(error);
          reject(error);
        }
      })
    });
  }

  private verifyEmailAndUser(email: string, user: string, id: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      email = email === this.actualEmail ? "emailNunca@gmail.com" : email;
      user = user === this.actualUser ? "" : user;
      this.service.verifyEmailUser(email, user, id).subscribe({
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
