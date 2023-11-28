import { Component } from '@angular/core';
import { CreateAccountService } from './create-account.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  constructor(private service:CreateAccountService, 
              private utils:UtilsService,
              private router:Router){}
  
  name: string = "";
  lastName: string = "";
  user: string = "";
  email: string = "";
  password: string = "";

  async createAccount(){
    const body = {
        name : this.name,
        lastName : this.lastName,
        user: this.user,
        email: this.email,
        password: this.password,
        type: "J"
    }

    this.service.createLogin(body).subscribe({
      next: () =>{
        alert("Cadastro Realizado com Sucesso!");
        this.router.navigate(["/"]);
      },
      error: (error => this.utils.showError(error))
    });
  }
}
