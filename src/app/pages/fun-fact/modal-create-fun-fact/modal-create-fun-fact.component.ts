import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FunFactService } from '../fun-fact.service';
import { CAccount } from 'src/app/class/CAccount';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { CFunFact } from 'src/app/class/CFunFact';
import { CErro } from 'src/app/class/CErro';

@Component({
  selector: 'app-modal-create-fun-fact',
  templateUrl: './modal-create-fun-fact.component.html',
  styleUrls: ['./modal-create-fun-fact.component.scss']
})
export class ModalCreateFunFactComponent {
  constructor(
    private dialog: MatDialogRef<ModalComponent>,
    private snackBar: MatSnackBar,
    private service: FunFactService,
    private sessionStorage: SessionStorageService
  ) {

  }
  funFact: CFunFact = new CFunFact();
  async createFunFact(form: NgForm) {
    let response: Boolean = false;

    if (form.invalid) {
      this.snackBar.open("Por favor, verifique a caixa de texto. Ela não pode estar vazia.", "OK", {
        duration: 5000
      });
      return;
    }

    this.funFact.account = this.sessionStorage.getData('account');
    this.funFact.account.role = this.sessionStorage.getData("accountRole") === '62' ? 'MASTER' : 'PLAYER';

    response = await this.insertFunFact();

    this.dialog.close(response);
  }

  closeDialog() {
    this.dialog.close(false);
  }

  private insertFunFact():Promise<Boolean>{
    return new Promise<Boolean>((resolve, reject) => {
      this.service.createFunFacts(this.funFact).subscribe({
        next: () => {
          resolve(true);
        },
        error: (erro) => {
          console.log(erro);
          reject(false);
        }
      });
    });
  }

}
