import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';

@Component({
  selector: 'app-modal-sucess-delete-sheet',
  templateUrl: './modal-sucess-delete-sheet.component.html',
  styleUrls: ['./modal-sucess-delete-sheet.component.scss']
})
export class ModalSucessDeleteSheetComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>){}

  close(){
    this.dialog.close();
  }
}
