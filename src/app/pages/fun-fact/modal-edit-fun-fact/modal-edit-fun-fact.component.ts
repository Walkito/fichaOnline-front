import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FunFactService } from '../fun-fact.service';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { CFunFact } from 'src/app/class/CFunFact';

@Component({
  selector: 'app-modal-edit-fun-fact',
  templateUrl: './modal-edit-fun-fact.component.html',
  styleUrls: ['./modal-edit-fun-fact.component.scss']
})
export class ModalEditFunFactComponent {
  constructor(
    private dialog: MatDialogRef<ModalComponent>,
    private snackBar: MatSnackBar,
    private service: FunFactService,
    private sessionStorage: SessionStorageService,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number,
      text: string
    }
  ) {
    this.funFact.id = this.data.id;
    this.funFact.fact = this.data.text;
    this.funFact.account = this.sessionStorage.getData('account');
    this.funFact.account.role = this.sessionStorage.getData("accountRole") === '62' ? 'MASTER' : 'PLAYER';
  }

  funFact: CFunFact = new CFunFact();

  editFunFact() {
    const response = {
      type: true,
      funFact: this.funFact
    }

    this.dialog.close(response);
  }

  closeDialog() {
    this.dialog.close(false);
  }
}
