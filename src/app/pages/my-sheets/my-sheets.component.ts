import { Component, OnInit } from '@angular/core';
import { CAccount } from 'src/app/class/CAccount';
import { MySheetsService } from './my-sheets.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CPlayerSheet } from 'src/app/class/CPlayerSheet';
import { DndSheetComponent } from '../sheet/dndSheet.component';

@Component({
  selector: 'app-my-sheets',
  templateUrl: './my-sheets.component.html',
  styleUrls: ['./my-sheets.component.scss']
})
export class MySheetsComponent implements OnInit {
  constructor(private service: MySheetsService, private utils: UtilsService, private router: Router) {

  }

  account: CAccount = new CAccount();
  playerSheets: CPlayerSheet[] = [];

  ngOnInit() {
    this.account = this.utils.getTemporaryAccountInfos();
    this.getSheets();
  }

  getSheets() {
    this.service.getSheets(this.account.id, 0).subscribe({
      next: (sheet) => {
        this.playerSheets = sheet;
      },
      error: (error) => this.utils.showError(error)
    })
  }

  openSheetPage(sheetNumber: number) {
    this.utils.setSheetId(this.playerSheets[sheetNumber].sheetDnD.id);
    this.utils.setSheetType(2);
    this.router.navigate(['home/my-sheets/dnd-sheet']);
  }

  openSheetPage2(sheetNumber: number) {
    this.utils.setSheetId(this.playerSheets[sheetNumber].sheetDnD.id);
    this.utils.setSheetType(1);
    this.router.navigate(['home/my-sheets/dnd-sheet']);
  }
}
