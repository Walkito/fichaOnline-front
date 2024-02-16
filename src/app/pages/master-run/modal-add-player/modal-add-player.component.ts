import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../sheet/modal/modal.component';
import { ModalAddSheetService } from '../../my-sheets/modal-add-sheet/modal-add-sheet.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { CAccount } from 'src/app/class/CAccount';
import { ModalAddPlayerService } from './modal-add-player.service';
import { CErro } from 'src/app/class/CErro';

@Component({
  selector: 'app-modal-add-player',
  templateUrl: './modal-add-player.component.html',
  styleUrls: ['./modal-add-player.component.scss']
})
export class ModalAddPlayerComponent {
  constructor(private dialog: MatDialogRef<ModalComponent>,
    private service: ModalAddPlayerService,
    private utils: UtilsService,
    private sessionStorage: SessionStorageService) { }

  input: string = "";
  account: CAccount = new CAccount();

  getAccount() {
    this.service.getAccount(this.input).subscribe({
      next: (account: CAccount) => this.account = account,
      error: () => {
        this.account.name = 'Usuário não encontrado.';
      }
    });
  }

  close(option: number) {
    const account : CAccount = this.account;
    this.dialog.close({option, account});
  }
}
