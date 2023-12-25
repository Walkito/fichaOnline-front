import { Component } from '@angular/core';
import { CAccount } from 'src/app/class/CAccount';
import { MySheetsService } from './my-sheets.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CPlayerSheet } from 'src/app/class/CPlayerSheet';

@Component({
  selector: 'app-my-sheets',
  templateUrl: './my-sheets.component.html',
  styleUrls: ['./my-sheets.component.scss']
})
export class MySheetsComponent {
  constructor(private service: MySheetsService, private utils: UtilsService, private router: Router){

  }

  account : CAccount = new CAccount();
  playerSheets : CPlayerSheet[] = [];

  ngOnInit(){
    this.account = this.utils.getTemporaryAccountInfos();
    this.getSheets();
  }

  getSheets(){
    this.service.getSheets(this.account.id, 0).subscribe({
      next: (sheet) => {
        this.playerSheets = sheet;
      },
      error: (error) => this.utils.showError(error)
    })
  }

  openSheetPage(){
    this.router.navigate(['home/my-sheets/sheet']);  
  }
}
