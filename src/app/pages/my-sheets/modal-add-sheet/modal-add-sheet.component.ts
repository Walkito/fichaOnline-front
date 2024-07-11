import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';
import { CRun } from 'src/app/class/CRun';
import { ModalAddSheetService } from './modal-add-sheet.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { CErro } from 'src/app/class/CErro';
import { CAccount } from 'src/app/class/CAccount';
import { SessionStorageService } from 'src/app/utils/session-storage.service';

@Component({
  selector: 'app-modal-add-sheet',
  templateUrl: './modal-add-sheet.component.html',
  styleUrls: ['./modal-add-sheet.component.scss']
})
export class ModalAddSheetComponent implements AfterViewInit{
  constructor(private dialog: MatDialogRef<ModalComponent>,
    private service: ModalAddSheetService,
    private utils: UtilsService,
    private sessionStorage: SessionStorageService) { }

    @ViewChild('selectRun') selectRun: ElementRef | undefined;

  runs: CRun[] = [];
  account: CAccount = this.sessionStorage.getData('account');
  runMasterName: string = "";
  selectedRun: CRun = new CRun();

  async ngAfterViewInit(){
    await this.getAllRunsFiltered();
    const selectElement = this.selectRun?.nativeElement;
    setTimeout(() => {
      selectElement.dispatchEvent(new Event('change'));
    }, 0);
  }

  async updateLabels(event: any) {
    if (event) {
      const selectedRunId = Number.parseInt(event.target.value);
      const selectedRun = this.runs.find((run) => run.id === selectedRunId);
      if (selectedRun) {
        this.selectedRun = selectedRun;
        this.runMasterName = await this.getMasterRun(selectedRun.masterId);
      }
    }
  }

  close(option: number) {
    const run = this.selectedRun;
    const system = this.selectedRun.system.name;
    this.dialog.close({option, run, system});
  }

  private getMasterRun(idRun: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.service.getMasterRun(idRun).subscribe({
        next: (masterAccount: CRun) => resolve(masterAccount.masterName),
        error: (error: CErro) => {
          this.utils.showError(error);
          reject(error);
        }
      })
    });
  }

  private getAllRunsFiltered(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.service.getAllRunsFiltered(['Em Andamento', 'Não Iniciada'], this.account.id).subscribe({
        next: (runs: CRun[]) =>  {
          this.runs = runs;
          resolve();
        },
        error: (error: CErro) => {
          this.utils.showError(error);
          reject();
        }
      })
    });
  }

}
