import { Component } from '@angular/core';
import { IAccount } from 'src/app/interfaces/IAccount';
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
              private route:ActivatedRoute){}

  account: IAccount | undefined;
  
  ngOnInit(){
    this.account = this.utils.getTemporaryAccountInfos();
  }

  
}
