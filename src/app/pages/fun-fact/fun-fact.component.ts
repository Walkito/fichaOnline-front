import { ModalEditFunFactComponent } from './modal-edit-fun-fact/modal-edit-fun-fact.component';
import { Component, OnInit } from '@angular/core';
import { CFunFact } from 'src/app/class/CFunFact';
import { FunFactService } from './fun-fact.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateFunFactComponent } from './modal-create-fun-fact/modal-create-fun-fact.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'moment';
import { CAccount } from 'src/app/class/CAccount';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { ModalDeleteFunFactComponent } from './modal-delete-fun-fact/modal-delete-fun-fact.component';

@Component({
  selector: 'app-fun-fact',
  templateUrl: './fun-fact.component.html',
  styleUrls: ['./fun-fact.component.scss']
})
export class FunFactComponent implements OnInit {
  funFacts: CFunFact[] = [];
  account: CAccount = new CAccount();

  constructor(
    private service: FunFactService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sessionStorage: SessionStorageService) {
  }

  async ngOnInit() {
    this.account = this.sessionStorage.getData("account");
    this.funFacts = await this.getFunFacts();
  }

  editFunFact(idFact: number, fact: string){
    this.dialog.open(ModalEditFunFactComponent, {
      data: {id: idFact, text: fact},
      disableClose: true
    }).afterClosed().subscribe({
      next : async (response) => {
        if(response.type === true){
          await this.editFunFacts(response.funFact);
          this.snackBar.open("Fato editado com sucesso!", "Legal", { duration: 3000 });
          this.funFacts = await this.getFunFacts();
        }
      }
    });
  }

  deleteFunFact(idFact: number) {
    this.dialog.open(ModalDeleteFunFactComponent, {
      disableClose: true
    }).afterClosed().subscribe({
      next: async (response: number) => {
        if(response === 0){
          const responseAPI = await this.deleteFact(idFact);
          if(responseAPI){
            this.snackBar.open("Fato excluído com sucesso!", "Legal", { duration: 3000 });
            this.funFacts = await this.getFunFacts();
          } else {
            this.snackBar.open("Não foi possível excluir o fato selecionado", "Entendi", { duration: 3000 });
          }
        }
      }
    });
  }

  openCreateModal() {
    this.dialog.open(ModalCreateFunFactComponent, {
      disableClose: true
    }).afterClosed().subscribe({
      next: async (response: boolean) => {
        if (response) {
          this.snackBar.open("Fato inserido com sucesso!", "Legal", { duration: 3000 });
          this.funFacts = await this.getFunFacts();
        }
      }
    });
  }

  private getFunFacts(): Promise<CFunFact[]> {
    return new Promise<CFunFact[]>((resolve, reject) => {
      this.service.getFunFacts(this.account.id).subscribe({
        next: (funFacts: CFunFact[]) => {
          resolve(funFacts);
        },
        error: (error) => {
          reject(error);
          console.log(error);
        }
      });
    });
  }

  private deleteFact(idFact: number):Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      this.service.deleteFunFacts(idFact).subscribe({
        next: (response: boolean) => {
          resolve(response);
        },
        error: (error) => {
          reject(error);
          console.log(error);
        }
      });
    });
  }

  private editFunFacts(funFact: CFunFact):Promise<CFunFact>{
    return new Promise<CFunFact>((resolve, reject) => {
      this.service.editFunFacts(funFact).subscribe({
        next: (response: CFunFact) => {
          resolve(response);
        },
        error: (error) => {
          reject(error);
          console.log(error);
        }
      });
    });
  }
}
