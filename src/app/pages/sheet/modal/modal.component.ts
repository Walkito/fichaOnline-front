import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>){}

  close(option: number){
    this.dialog.close(option);
  }
}
