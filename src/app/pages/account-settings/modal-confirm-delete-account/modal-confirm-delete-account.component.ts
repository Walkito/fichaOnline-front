import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-confirm-delete-account',
  templateUrl: './modal-confirm-delete-account.component.html',
  styleUrls: ['./modal-confirm-delete-account.component.scss']
})
export class ModalConfirmDeleteAccountComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>){}

  close(option: number){
    this.dialog.close(option);
  }
}
