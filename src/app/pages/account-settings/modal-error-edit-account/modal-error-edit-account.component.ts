import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-error-edit-account',
  templateUrl: './modal-error-edit-account.component.html',
  styleUrls: ['./modal-error-edit-account.component.scss']
})
export class ModalErrorEditAccountComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>){
  }

  close(){
    this.dialog.close();
  }
}
