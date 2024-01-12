import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-error-create-account',
  templateUrl: './modal-error-create-account.component.html',
  styleUrls: ['./modal-error-create-account.component.scss']
})
export class ModalErrorCreateAccountComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>){
  }

  close(){
    this.dialog.close();
  }
}
