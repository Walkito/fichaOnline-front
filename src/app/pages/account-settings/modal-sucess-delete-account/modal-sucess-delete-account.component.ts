import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-sucess-delete-account',
  templateUrl: './modal-sucess-delete-account.component.html',
  styleUrls: ['./modal-sucess-delete-account.component.scss']
})
export class ModalSucessDeleteAccountComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { value: number }){
  }

  mensage : string = this.data.value === 0 ? 'Excluída' : 'Inativada';

  close(){
    this.dialog.close();
  }
}
