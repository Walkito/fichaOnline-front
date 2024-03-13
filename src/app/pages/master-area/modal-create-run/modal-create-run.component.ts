import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';
import { NgForm } from '@angular/forms';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { ModalCreateRunService } from './modal-create-run.service';
import { CRun } from 'src/app/class/CRun';
import { CSystem } from 'src/app/class/CSystem';
import { CErro } from 'src/app/class/CErro';
import { UtilsService } from 'src/app/utils/utils.service';
import { CAccount } from 'src/app/class/CAccount';

@Component({
  selector: 'app-modal-create-run',
  templateUrl: './modal-create-run.component.html',
  styleUrls: ['./modal-create-run.component.scss']
})
export class ModalCreateRunComponent implements OnInit {
  constructor(private dialog: MatDialogRef<ModalComponent>,
    private sessionStorage: SessionStorageService,
    private service: ModalCreateRunService,
    private utils: UtilsService) { }

    @ViewChild('runSystemSelect') selectSystem: ElementRef | undefined;

  runName: string = "";
  selectedSystem: CSystem = new CSystem();
  systems: CSystem[] = [];
  private accountID: number = 0;

  async ngOnInit() {
    this.systems = await this.getSystems();
    const account: CAccount = this.sessionStorage.getData('account');
    this.accountID = account.id;
    const selectElement = this.selectSystem?.nativeElement;
    setTimeout(() => {
      selectElement.dispatchEvent(new Event('change'));
    }, 0);
  }

  async create(option:number,form: NgForm) {
    let response: boolean = false;
    let run: CRun = new CRun();
    if (form.valid) {
      run = await this.registerRun();
      response = await this.linkAccountRun(this.accountID, run.id);
    };
    this.dialog.close({option, response, run});
  }

  private getSystems(): Promise<CSystem[]> {
    return new Promise<CSystem[]>((resolve, reject) => {
      this.service.getSystem().subscribe({
        next: (systems: CSystem[]) => resolve(systems),
        error: (error: CErro) => {
          alert(this.utils.showError(error));
          reject(error);
        }
      })
    });
  }

  private registerRun(): Promise<CRun> {
    return new Promise<CRun>((resolve, reject) => {
      const run: CRun = new CRun();
      run.campaign = this.runName;
      run.system.id = this.selectedSystem.id;
      run.dateBeginning = new Date();
      run.masterId = this.accountID;

      this.service.registerRun(run).subscribe({
        next: (run: CRun) => resolve(run),
        error: (error: CErro) => {
          alert(this.utils.showError(error));
          reject(error);
        }
      });
    })
  }

  private linkAccountRun(accountID: number, runID: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const accountRunDTO = {
        idRun: runID,
        idAccount: accountID,
      };
      this.service.linkAccountRun(accountRunDTO).subscribe({
        next: (response: boolean) => resolve(response),
        error: (error: CErro) => {
          alert(this.utils.showError(error));
          reject(error);
        }
      })
    });
  }
}
