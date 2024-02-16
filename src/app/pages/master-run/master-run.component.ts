import { Component, OnInit } from '@angular/core';
import { MasterRunService } from './master-run.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { CRun } from 'src/app/class/CRun';
import { CErro } from 'src/app/class/CErro';
import { CNpc } from 'src/app/class/CNpc';
import { MatDialog } from '@angular/material/dialog';
import { ModalChangeStatusComponent } from './modal-change-status/modal-change-status.component';
import { ModalCancelRunComponent } from './modal-cancel-run/modal-cancel-run.component';
import { Route, Router } from '@angular/router';
import { CAccount } from 'src/app/class/CAccount';
import { CSheetDnD } from 'src/app/class/sheets/CSheetDnD';
import { CPlayerSheet } from 'src/app/class/CPlayerSheet';
import { DnDSheetService } from '../sheet/dnd/dndSheet.service';
import { ModalAddPlayerComponent } from './modal-add-player/modal-add-player.component';

@Component({
  selector: 'app-master-run',
  templateUrl: './master-run.component.html',
  styleUrls: ['./master-run.component.scss']
})
export class MasterRunComponent implements OnInit {
  constructor(private service: MasterRunService,
    private dndService: DnDSheetService,
    private utils: UtilsService,
    private sessionStorage: SessionStorageService,
    private dialog: MatDialog,
    private router: Router) { }

  run: CRun = new CRun();
  npcs: CNpc[] = [];
  players: CAccount[] = [];
  charactersNames: string[] = [];
  urlsCharactersPictures: string[] = [];

  tabs: boolean[] = [true, false, false, false];
  annotations: boolean[] = [true, false, false, false, false, false];
  private runInterval: any;

  async ngOnInit() {
    this.openInitialTab();

    const idRun: number = Number.parseInt(this.sessionStorage.getData('idRunMasterRun'));
    this.run = await this.getRun(idRun);
    this.npcs = await this.getNpcs();
    this.addEmptyNpc();

    this.players = await this.getAccounts();
    this.getCharacters();

    this.initiateRunInterval();
  }

  openInitialTab() {
    if (this.sessionStorage.getData('selectedTab') === '') {
      this.sessionStorage.saveData('selectedTab', '1');
    } else {
      this.changeTab(Number.parseInt(this.sessionStorage.getData('selectedTab')));
    }
  }

  addNpc(index: number) {
    const newNPC: CNpc | undefined = this.npcs.at(this.npcs.length - 1);
    if (newNPC && newNPC.name != "") {
      newNPC.run = this.run;
      newNPC.id === 0 ? this.addNewNpc(newNPC, index) : this.editNpc(newNPC);
    }
  }

  saveRun() {
    this.service.saveRun(this.run).subscribe({
      next: (run: CRun) => {
        this.run = run;
      },
      error: (erro: CErro) => {
        alert(this.utils.showError(erro));
      }
    })
  }

  changeTab(tabOpened: number) {
    this.tabs.forEach((tab: boolean, index: number) => {
      if ((tabOpened - 1) === index) {
        this.tabs[index] = true;
        this.sessionStorage.saveData('selectedTab', tabOpened);
      } else {
        this.tabs[index] = false;
      }
      this.tabs[index] = (tabOpened - 1) === index ? true : false;
    });
    this.tabs[0] === false ? clearInterval(this.runInterval) : this.initiateRunInterval();
  }

  changeAnnotations(annotationOpened: number) {
    this.annotations.forEach((annotation: boolean, index: number) => {
      this.annotations[index] = (annotationOpened - 1) === index ? true : false;
    });
  }

  changeEpisode(type: string) {
    let episode = this.run.sessionNumber;
    episode = type === 'plus' ? episode + 1 : episode - 1;
    this.run.sessionNumber = episode;
    this.saveRun();
  }

  changeStatus() {
    this.dialog.open(ModalChangeStatusComponent, {
      disableClose: true
    }).afterClosed().subscribe({
      next: (response: any) => {
        if (response.option === 1) {
          this.run.status = response.status;
          this.saveRun();
        }
      }
    });
  }

  goBack() {
    clearInterval(this.runInterval);
    this.sessionStorage.saveData('selectedTab', 1);
    this.router.navigate(['/home/master-area']);
  }

  deleteRun() {
    this.dialog.open(ModalCancelRunComponent, {
      disableClose: true
    }).afterClosed().subscribe({
      next: (option: number) => {
        if (option === 1) {
          this.service.deleteRun(this.run.id).subscribe({
            next: (response: boolean) => {
              clearInterval(this.runInterval);
              response === true && this.router.navigate(['/home/master-area']);
            },
            error: (error: CErro) => alert(this.utils.showError(error))
          });
        }
      }
    });
  }

 addPlayer(){
  this.dialog.open(ModalAddPlayerComponent, {
    disableClose: false
  });
 }

  private getImage(idSheet: number): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      this.dndService.getCharacterPicture(idSheet).subscribe({
        next: (image: Blob) => resolve(image),
        error: (error: CErro) => {
          reject(error);
        }
      })
    })
  }

  private async getCharacters() {
    switch (this.run.system.name) {
      case 'D&D 5e':
        const sheets : CSheetDnD[] = await this.getDnD5eCharacters();
        for (const sheet of sheets) {
          this.charactersNames.push(sheet.personalInfo.characterName);
          if(sheet.characterPictureFileName === '' || sheet.characterPictureFileName === null){
            this.urlsCharactersPictures.push("assets/iconePersonagem.png");
          } else {
            const blob: Blob = await this.getImage(sheet.id);
            this.urlsCharactersPictures.push(URL.createObjectURL(blob));
          }
        };
        break;
    }
  }

  private getDnD5eCharacters(): Promise<CSheetDnD[]> {
    return new Promise<CSheetDnD[]>(async (resolve, reject) => {
      const ids: number[] = await this.getPlayerSheets();
      this.service.getDnD5eSheets(ids).subscribe({
        next: (sheets: CSheetDnD[]) => {
          sheets.sort((a,b)=> {
            let comparison = a.personalInfo.characterName.localeCompare(b.personalInfo.characterName);
            return comparison;
          });
          resolve(sheets);
        },
        error: (error: CErro) => {
          alert(this.utils.showError(error));
          reject(error);
        }
      });
    });
  }

  private getPlayerSheets(): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      this.service.getPlayerSheets(this.run.id).subscribe({
        next: (playerSheets: CPlayerSheet[]) => {
          let ids: number[] = [];
          playerSheets.forEach(playerSheet => {
            ids.push(playerSheet.sheetDnD.id);
          });
          resolve(ids);
        },
        error: (error: CErro) => {
          alert(this.utils.showError(error));
          reject(error);
        }
      });
    });
  }

  private initiateRunInterval() {
    this.runInterval = setInterval(() => {
      this.saveRun();
    }, 10000);
  }

  private getAccounts(): Promise<CAccount[]> {
    return new Promise<CAccount[]>((resolve, reject) => {
      this.service.getLinkedAccounts(this.run.id).subscribe({
        next: (accounts: CAccount[]) => {
          accounts.sort((a, b) => {
            let comparison = a.name.localeCompare(b.name);

            if (comparison === 0) {
              comparison = a.lastName.localeCompare(b.lastName);
            }

            return comparison;
          });
          resolve(accounts);
        },
        error: (error: CErro) => {
          alert(this.utils.showError(error));
          reject(error);
        }
      });
    });
  }

  private getNpcs(): Promise<CNpc[]> {
    return new Promise<CNpc[]>((resolve, reject) => {
      this.service.getNpcs(this.run.id).subscribe({
        next: (npcs: CNpc[]) => resolve(npcs),
        error: (error: CErro) => {
          alert(this.utils.showError(error));
          reject(error);
        }
      });
    });
  }

  private addEmptyNpc() {
    this.npcs.push(new CNpc());
  }

  private getRun(id: number): Promise<CRun> {
    return new Promise<CRun>((resolve, reject) => {
      this.service.getRun(id).subscribe({
        next: (run: CRun) => {
          resolve(run)
        }
        ,
        error: (error: CErro) => {
          alert(this.utils.showError(error));
          reject(error);
        }
      });
    });
  }

  private addNewNpc(npc: CNpc, index: number) {
    this.service.addNpc(npc).subscribe({
      next: (npcs: CNpc[]) => {
        this.npcs = npcs;
        index === this.npcs.length - 1 && this.addEmptyNpc();
      },
      error: (error: CErro) => alert(this.utils.showError(error))
    });
  }

  private editNpc(npc: CNpc) {
    this.service.editNpc(npc).subscribe({
      next: (npcs: CNpc[]) => {
        this.npcs = npcs;
      },
      error: (error: CErro) => alert(this.utils.showError(error))
    })
  }
}
