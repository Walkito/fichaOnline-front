import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-cancel-run',
  templateUrl: './modal-cancel-run.component.html',
  styleUrls: ['./modal-cancel-run.component.scss']
})
export class ModalCancelRunComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>){

  }
  close(option: number){
    this.dialog.close(option);
  }
}
