import { Component } from '@angular/core';
import { MasterRunService } from '../master-run.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-change-status',
  templateUrl: './modal-change-status.component.html',
  styleUrls: ['./modal-change-status.component.scss']
})
export class ModalChangeStatusComponent {
  constructor(private service: MasterRunService,
    private utils: UtilsService,
    private sessionStorage: SessionStorageService,
    private dialog: MatDialogRef<ModalComponent>) { }

  status: string[] = ["Concluída", "Em Andamento", "Interrompida", "Não Iniciada", "Cancelada"];
  selectedStatus: string = "";

  close(option: number) {
    const status :string = this.selectedStatus;

    if(status != ''){
      this.dialog.close({option, status});
    } else if(option === 0){
      this.dialog.close({option, status});
    }
  }
}
