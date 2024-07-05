import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateRunComponent } from './modal-create-run/modal-create-run.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { CAccount } from 'src/app/class/CAccount';
import { CRun } from 'src/app/class/CRun';
import { MasterAreaService } from './master-area.service';
import { CErro } from 'src/app/class/CErro';
import { UtilsService } from 'src/app/utils/utils.service';
import { ModalSelectRunComponent } from './modal-select-run/modal-select-run.component';

@Component({
  selector: 'app-master-area',
  templateUrl: './master-area.component.html',
  styleUrls: ['./master-area.component.scss']
})
export class MasterAreaComponent {
  constructor(private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private sessionStorage: SessionStorageService,
    private service: MasterAreaService,
    private utils: UtilsService) { }

  openModalCreateRun() {
    this.dialog.open(ModalCreateRunComponent, {
      disableClose: true
    }).afterClosed().subscribe({
      next: (response: any) => {
        if (response.option === 1) {
          if (response.response) {
            this.sessionStorage.saveData('idRunMasterRun', response.run.id);
            this.openMasterRun();
          } else {
            this.snackBar.open('Ocorreu um erro ao tentar criar a Run.', 'OK');
          };
        };
      }
    });
  }

  openMasterRun() {
    this.router.navigate(['home/master-area/master-run']);
  }

  selectRun() {
    this.dialog.open(ModalSelectRunComponent, {
      disableClose: true
    }).afterClosed().subscribe({
      next: (response: any) => {
        if (response.option === 1) {
          this.sessionStorage.saveData('idRunMasterRun', response.runId);
          this.openMasterRun();
        };
      }
    });
  }
}
