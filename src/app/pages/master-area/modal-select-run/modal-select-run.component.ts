import { Component, OnInit } from '@angular/core';
import { CAccount } from 'src/app/class/CAccount';
import { CErro } from 'src/app/class/CErro';
import { CRun } from 'src/app/class/CRun';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { ModalSelectRunService } from './modal-select-run.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-select-run',
  templateUrl: './modal-select-run.component.html',
  styleUrls: ['./modal-select-run.component.scss']
})
export class ModalSelectRunComponent implements OnInit {
  constructor(private sessionStorage: SessionStorageService,
    private service: ModalSelectRunService,
    private utils: UtilsService,
    private dialog: MatDialogRef<ModalComponent>){};

  private idAccount: number = 0;
  runs: CRun[] = [];
  run: CRun = new CRun();

  async ngOnInit() {
    const account: CAccount = this.sessionStorage.getData('account');
    this.idAccount = account.id;
    this.runs = await this.getRuns();
  }

  private getRuns():Promise<CRun[]> {
    return new Promise<CRun[]>((resolve, reject)=>{
      this.service.getMasterRuns(this.idAccount).subscribe({
        next: (runs: CRun[]) => resolve(runs),
        error: (error: CErro) => {
          this.utils.showError(error);
          reject(error);
        }
      });
    });
  }

  close(option: number){
    const runId = this.run.id;
    if(runId != 0){
      this.dialog.close({option, runId});
    }
    if(option === 0){
      this.dialog.close({option, runId});
    }
  }
}
