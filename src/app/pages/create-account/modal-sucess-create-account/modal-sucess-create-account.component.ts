import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-sucess-create-account',
  templateUrl: './modal-sucess-create-account.component.html',
  styleUrls: ['./modal-sucess-create-account.component.scss']
})
export class ModalSucessCreateAccountComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>){
  }

  close(){
    this.dialog.close();
  }
}
