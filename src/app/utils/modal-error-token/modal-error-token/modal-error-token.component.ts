import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/pages/sheet/modal/modal.component';
import { SessionStorageService } from '../../session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-error-token',
  templateUrl: './modal-error-token.component.html',
  styleUrls: ['./modal-error-token.component.scss']
})
export class ModalErrorTokenComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { error: string }){
  }

  close(){
    this.sessionStorageService.clearAll();
    this.router.navigate(['login']);
    this.dialog.close();
  }
}
