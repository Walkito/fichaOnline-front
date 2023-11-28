import { Component } from '@angular/core';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount } from 'src/app/interfaces/IAccount';
import { AccountSettingsService } from './account-settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  constructor(private service:AccountSettingsService, 
    private utils:UtilsService,
    private router:Router,
    private route:ActivatedRoute){}

  account: IAccount = {
    id : "",
    user : "",
    name : "",
    lastName : "",
    email : "",
    password : "",
    type: "",
  };
  
  ngOnInit(){
    this.account = this.utils.getTemporaryAccountInfos();
  }

  async editAccount(){
    const body = {
      id : this.account.id,
      user : this.account.user,
      name : this.account.name,
      lastName : this.account.lastName,
      email : this.account.email,
      password : this.account.password,
      type : this.account.type
    }

    this.service.editAccount(body).subscribe({
      next: () => {
        alert("Conta atualizada com sucesso!")
        this.router.navigate(["home"])
      },
      error: (error => this.utils.showError(error))
    });
  }
  
}
