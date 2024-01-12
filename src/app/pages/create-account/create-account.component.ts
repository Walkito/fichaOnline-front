import { Component, HostListener, OnInit } from '@angular/core';
import { CreateAccountService } from './create-account.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/utils/utils.service';
import { CAccount } from 'src/app/class/CAccount';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorCreateAccountComponent } from './modal-error-create-account/modal-error-create-account.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  account: CAccount = new CAccount();

  constructor(private service: CreateAccountService,
    private utils: UtilsService,
    private router: Router,
    private dialog: MatDialog) { }

  async createAccount(form: NgForm) {
    if (form.valid) {
      this.service.createLogin(this.account).subscribe({
        next: () => {
          alert("Cadastro Realizado com Sucesso!");
          this.router.navigate(["/"]);
        },
        error: (error => alert(this.utils.showError(error)))
      });
    } else {
      const dialogRef = this.dialog.open(ModalErrorCreateAccountComponent, {
        disableClose: true,
      })
    }
  }


}
