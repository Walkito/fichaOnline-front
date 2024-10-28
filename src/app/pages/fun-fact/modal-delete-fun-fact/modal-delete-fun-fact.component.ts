import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-delete-fun-fact',
  templateUrl: './modal-delete-fun-fact.component.html',
  styleUrls: ['./modal-delete-fun-fact.component.scss']
})
export class ModalDeleteFunFactComponent {
  constructor(
    private dialog: MatDialogRef<ModalComponent>,
  ){

  }

  optionSelection(option: number){
    this.dialog.close(option);
  }
}
