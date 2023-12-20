import { Component } from '@angular/core';
import { CAccount } from 'src/app/class/CAccount';
import { LoginService } from '../login/login.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private service:LoginService,
              private utils:UtilsService,
              ){}

  account: CAccount = new CAccount;

  ngOnInit(){
    this.account = this.utils.getTemporaryAccountInfos();
  }

}
