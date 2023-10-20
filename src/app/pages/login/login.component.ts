import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

constructor(private service:LoginService, 
            private utils:UtilsService,
            private router:Router){}

user: string = "";
password: string = "";

async doLogin(){
  const loginBody = {
    user: this.user,
    email: this.user,
    password: this.password,
  }

  this.service.doLogin(loginBody).subscribe({
    next: (account) =>{
      this.router.navigate(['/home'])
    },
    error: (error) => this.utils.showError(error),
  })


}
}
