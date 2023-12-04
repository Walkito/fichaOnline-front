import { Component } from '@angular/core';
import { CreateAccountService } from './create-account.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/utils/utils.service';
import { CAccount } from 'src/app/class/CAccount';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  account: CAccount = new CAccount;

  constructor(private service: CreateAccountService,
    private utils: UtilsService,
    private router: Router) { }


  createAccount(): void {
    this.service.createLogin(this.account).subscribe({
      next: () => {
        alert("Cadastro Realizado com Sucesso!");
        this.router.navigate(["/"]);
      },
      error: (error => this.utils.showError(error))
    });
  }
}
