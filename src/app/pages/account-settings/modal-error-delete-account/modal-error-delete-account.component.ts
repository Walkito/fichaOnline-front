import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-error-delete-account',
  templateUrl: './modal-error-delete-account.component.html',
  styleUrls: ['./modal-error-delete-account.component.scss']
})
export class ModalErrorDeleteAccountComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { error: string }){
  }

  close(){
    this.dialog.close();
  }
}
