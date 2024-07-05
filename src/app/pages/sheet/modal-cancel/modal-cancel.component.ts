import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cancel',
  templateUrl: './modal-cancel.component.html',
  styleUrls: ['./modal-cancel.component.scss']
})
export class ModalCancelComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>){

  }
  close(option: number){
    this.dialog.close(option);
  }
}
