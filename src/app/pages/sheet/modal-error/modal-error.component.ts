import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.scss']
})
export class ModalErrorComponent implements OnInit {
  constructor(private dialog: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { errors: string[] }){
  }
  errorsSliceOne : string[] = new Array();
  errorsSliceTwo : string[] = new Array();

  ngOnInit(){
    this.errorsSliceOne = this.data.errors.slice(0, 11);
    this.errorsSliceTwo = this.data.errors.slice(11, 20);
  }
  close(){
    this.dialog.close();
  }
}
