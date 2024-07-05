import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-error-delete-sheet',
  templateUrl: './modal-error-delete-sheet.component.html',
  styleUrls: ['./modal-error-delete-sheet.component.scss']
})
export class ModalErrorDeleteSheetComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>){

  }
  close(option: number){
    this.dialog.close(option);
  }
}
