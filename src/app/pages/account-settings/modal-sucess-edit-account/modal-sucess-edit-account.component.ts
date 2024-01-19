import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-sucess-edit-account',
  templateUrl: './modal-sucess-edit-account.component.html',
  styleUrls: ['./modal-sucess-edit-account.component.scss']
})
export class ModalSucessEditAccountComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>){
  }

  close(){
    this.dialog.close();
  }
}
