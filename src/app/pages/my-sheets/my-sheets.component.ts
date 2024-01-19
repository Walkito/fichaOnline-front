import { Component, OnInit } from '@angular/core';
import { CAccount } from 'src/app/class/CAccount';
import { MySheetsService } from './my-sheets.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CPlayerSheet } from 'src/app/class/CPlayerSheet';
import { DndSheetComponent } from '../sheet/dnd/dndSheet.component';
import { CErro } from 'src/app/class/CErro';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ModalSucessDeleteSheetComponent } from './modal-sucess-delete-sheet/modal-sucess-delete-sheet.component';

@Component({
  selector: 'app-my-sheets',
  templateUrl: './my-sheets.component.html',
  styleUrls: ['./my-sheets.component.scss']
})
export class MySheetsComponent implements OnInit {
  constructor(private service: MySheetsService, private utils: UtilsService, private router: Router,
    private dialog: MatDialog) {

  }

  account: CAccount = new CAccount();
  playerSheets: CPlayerSheet[] = [];

  ngOnInit() {
    this.account = this.utils.getTemporaryAccountInfos();
    this.getSheets();
  }

  deleteSheet(sheetNumber: number) {
    this.dialog.open(ModalConfirmComponent, {
      disableClose: true
    }).afterClosed().subscribe(option => {
      if (option === 1) {
        const sheetId = this.playerSheets[sheetNumber].sheetDnD.id
        this.service.deleteSheet(sheetId).subscribe({
          next: () => {
            this.dialog.open(ModalSucessDeleteSheetComponent, {
              disableClose: true
            });
            this.getSheets();
          },
          error: (error: CErro) => {
            alert(this.utils.showError(error));
          }
        })
      }
    })
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
}
