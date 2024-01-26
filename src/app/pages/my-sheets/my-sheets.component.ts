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
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { ModalAddSheetComponent } from './modal-add-sheet/modal-add-sheet.component';

@Component({
  selector: 'app-my-sheets',
  templateUrl: './my-sheets.component.html',
  styleUrls: ['./my-sheets.component.scss']
})
export class MySheetsComponent implements OnInit {
  constructor(private service: MySheetsService, private utils: UtilsService, private router: Router,
    private dialog: MatDialog, private sessionStorage: SessionStorageService) {

  }

  account: CAccount = new CAccount();
  playerSheets: CPlayerSheet[] = [];

  ngOnInit() {
    this.account = this.sessionStorage.getData('account');
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

  openSheetPage(sheetNumber: number) {
    this.sessionStorage.saveData('sheetId', this.playerSheets[sheetNumber].sheetDnD.id);
    const sheetSystem = this.playerSheets[sheetNumber].run.system.name;

    this.navigateToSheet(sheetSystem, 2);
  }

  addSheet(){
    this.dialog.open(ModalAddSheetComponent, {
      disableClose: true
    }).afterClosed().subscribe((result:any) => {
      if(result.option === 1){
        this.sessionStorage.saveData('runCreateSheet',result.run);
        this.navigateToSheet(result.system, 1);
      }
    })
  }

  private getSheets() {
    this.service.getSheets(this.account.id, 0).subscribe({
      next: (sheet) => {
        this.playerSheets = sheet;
      },
      error: (error) => this.utils.showError(error)
    })
  }

  private navigateToSheet(sheetSystem: string, type: number){
    this.sessionStorage.saveData('sheetType', type);
    switch(sheetSystem){
      case 'D&D 5e':
        this.router.navigate(['home/my-sheets/dnd-sheet']);
        break;
    }
  }
}
