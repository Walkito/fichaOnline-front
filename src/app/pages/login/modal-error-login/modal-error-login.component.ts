import { Component, Inject } from '@angular/core';
import { ModalComponent } from '../../sheet/modal/modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-error-login',
  templateUrl: './modal-error-login.component.html',
  styleUrls: ['./modal-error-login.component.scss']
})
export class ModalErrorLoginComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { error: string }){
  }

  close(){
    this.dialog.close();
  }
}
