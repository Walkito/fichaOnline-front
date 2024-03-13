import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-confirm-remove-player',
  templateUrl: './modal-confirm-remove-player.component.html',
  styleUrls: ['./modal-confirm-remove-player.component.scss']
})
export class ModalConfirmRemovePlayerComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>){
  }
  close(option: number){
    this.dialog.close(option);
  }
}
