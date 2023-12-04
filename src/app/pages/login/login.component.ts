import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { Router } from '@angular/router';
import { CLogin } from 'src/app/class/CLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

login : CLogin = new CLogin();

constructor(private service:LoginService,
            private utils:UtilsService,
            private router:Router){}


async doLogin(){
  this.service.doLogin(this.login).subscribe({
    next: (account) =>{
      this.utils.setTemporaryAccountInfos(account);
      this.router.navigate(['/home']);
    },
    error: (error) => this.utils.showError(error)
  })


}
}
