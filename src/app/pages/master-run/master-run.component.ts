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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalConfirmRemovePlayerComponent } from './modal-confirm-remove-player/modal-confirm-remove-player.component';
import { CCombatInitiative } from 'src/app/class/sheets/dndSheet/CCombatInitiative';
import { CSpellTime } from 'src/app/class/sheets/dndSheet/CSpellTime';
import { WebSocketService } from 'src/app/utils/web-socket.service';

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
    private router: Router,
    private snackBar: MatSnackBar,
    private socketService: WebSocketService) { }

  run: CRun = new CRun();

  //Geral
  npcs: CNpc[] = [];
  tabs: boolean[] = [true, false, false, false];
  annotations: boolean[] = [true, false, false, false, false, false];
  private runInterval: any;

  //Jogadores
  players: CAccount[] = [];
  charactersNames: string[] = [];
  urlsCharactersPictures: string[] = [];
  sheetsIDs: number[] = [];

  //Combate DnD
  dndAllies: CSheetDnD[] = [];
  dndEnemies: CSheetDnD[] = [];
  combatOrder: CCombatInitiative[] = [];
  dndSpellsTime: CSpellTime[] = [];
  round: number = 0;

  partyNumber: number = 0;

  async ngOnInit() {
    this.socketConfig();

    this.openInitialTab();

    const idRun: number = Number.parseInt(this.sessionStorage.getData('idRunMasterRun'));
    this.run = await this.getRun(idRun);
    this.npcs = await this.getNpcs();
    this.addEmptyNpc();


    this.players = await this.getAccounts();
    this.removeMasterFromPlayers();
    await this.getCharacters();


    for (const name of this.charactersNames) {
      if (name != '') {
        this.addDnD5eCombatOrder(name, -1);
      }
    }

    this.addNewDnD5eAllie();
    this.addNewDnD5eEnemie();
    this.addNewDnD5eSpell();
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

  openInitialTab() {
    if (this.sessionStorage.getData('selectedTab') === '') {
      this.sessionStorage.saveData('selectedTab', '1');
      this.changeTab(1);
    } else {
      this.changeTab(Number.parseInt(this.sessionStorage.getData('selectedTab')));
    }
  }

  goBack() {
    clearInterval(this.runInterval);
    this.sessionStorage.saveData('selectedTab', 1);
    this.router.navigate(['/home/master-area']);
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



  addPlayer() {
    this.dialog.open(ModalAddPlayerComponent, {
      disableClose: false
    }).afterClosed().subscribe({
      next: async (response: any) => {
        if (response.option === 1) {
          const serviceResponse = await this.linkAccount(response.account);
          if (serviceResponse) {
            location.reload();
          } else {
            this.snackBar.open('Este jogador já está vinculado com esta Run.', 'Entendi.');
          }
        }
      }
    });
  }

  removePlayer(index: number) {
    this.dialog.open(ModalConfirmRemovePlayerComponent, {
      disableClose: true
    }).afterClosed().subscribe({
      next: async (response: number) => {
        if (response === 1) {
          if (await this.unlinkAccount(index)) {
            location.reload();
          } else {
            this.snackBar.open('Não foi possível remover o jogador da Run pois o mesmo possui um personagem já criado', 'Entendi');
          }
        }
      }
    });
  }

  openPlayerSheet(index: number) {
    const sheetID = this.sheetsIDs.at(index);
    this.sessionStorage.saveData('sheetType', 3);
    this.sessionStorage.saveData('sheetId', sheetID);
    console.log(sheetID);

    switch (this.run.system.name) {
      case 'D&D 5e':
        const url = this.router.createUrlTree(['home/my-sheets/dnd-sheet']).toString();
        window.open(url, 'blank');
        break;
    }
  }



  increaseRound(event: MouseEvent) {
    if (event.button === 0) {
      event.preventDefault();
      this.round += 1;
    }
  }

  decreasesRound(event: MouseEvent) {
    event.preventDefault();
    if (this.round != 0) {
      this.round -= 1;
    }
  }

  removeAllieDnD5e(allie: CSheetDnD) {
    this.removeDnD5eAllie(allie);
  }

  removeEnemieDnD5e(enemie: CSheetDnD) {
    this.removeDnD5eEnemie(enemie);
  }

  insertCombatOrderDnD5e(name: string, table: number) {
    this.addDnD5eCombatOrder(name, table);
  }

  orderCombat() {
    this.sortCombatOrder();
  }

  addSpellDnD5e() {
    this.addNewDnD5eSpell();
  }

  removeSpellDnD5e(spell: CSpellTime) {
    this.removeDnD5eSpell(spell);
  }

  orderSpells() {
    this.sortSpellsTime();
  }


  private socketConfig() {
    this.socketService.connect().subscribe(() => {
      this.socketService.subscribe('/topic/SheetEdit', async (message: any) => {
        const sheets = await this.getDnD5eCharacters();
        this.dndAllies.forEach((allie, indexA) => {
          const matchingSheet = sheets.find(sheet => sheet.id === allie.id && sheet != allie);
          if(matchingSheet){
            this.dndAllies[indexA] = matchingSheet;
          }
        })
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

  private initiateRunInterval() {
    this.runInterval = setInterval(() => {
      this.saveRun();
    }, 10000);
  }



  private removeMasterFromPlayers() {
    for (const [index, player] of this.players.entries()) {
      player.id === this.run.masterId && this.players.splice(index, 1);
    }
  }

  private unlinkAccount(index: number): Promise<boolean> {
    let runAccountDTO: Object = {};
    const account = this.players.at(index);
    if (account) {
      runAccountDTO = {
        idRun: this.run.id,
        idAccount: account.id
      }
    }
    return new Promise<boolean>((resolve, reject) => {
      this.service.unlinkAccount(runAccountDTO).subscribe({
        next: (response: boolean) => resolve(response),
        error: (error: CErro) => {
          alert(this.utils.showError);
          reject(error);
        }
      })
    });
  }

  private linkAccount(account: CAccount): Promise<boolean> {
    const runAccountDTO = {
      idRun: this.run.id,
      idAccount: account.id
    }
    return new Promise<boolean>((resolve, reject) => {
      this.service.linkAccount(runAccountDTO).subscribe({
        next: (response: boolean) => resolve(response),
        error: (error: CErro) => {
          alert(this.utils.showError);
          reject(error);
        }
      });
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

  private async getCharacters(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      switch (this.run.system.name) {
        case 'D&D 5e':
          const sheets: CSheetDnD[] = await this.getDnD5eCharacters();
          this.dndAllies = sheets;
          this.partyNumber = this.dndAllies.length;

          for (const sheet of sheets) {
            this.charactersNames.push(sheet.personalInfo.characterName);
            this.sheetsIDs.push(sheet.id);
            if (sheet.characterPictureFileName === '' || sheet.characterPictureFileName === null) {
              this.urlsCharactersPictures.push("assets/iconePersonagem.png");
            } else {
              const blob: Blob = await this.getImage(sheet.id);
              this.urlsCharactersPictures.push(URL.createObjectURL(blob));
            }
          };

          break;
      }
      resolve();
    });
  }

  private getDnD5eCharacters(): Promise<CSheetDnD[]> {
    return new Promise<CSheetDnD[]>(async (resolve, reject) => {
      const ids: number[] = await this.getPlayerSheets();
      this.service.getDnD5eSheets(ids).subscribe({
        next: (sheets: CSheetDnD[]) => {
          sheets.sort((a, b) => {
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



  private addNewDnD5eAllie() {
    this.dndAllies.push(new CSheetDnD());
  }

  private removeDnD5eAllie(selectedAllie: CSheetDnD) {
    this.dndAllies.forEach((allie, index) => {
      if (allie === selectedAllie) {
        this.removeDnD5eCombatOrder(allie.personalInfo.characterName);
        if (index === this.partyNumber) {
          this.dndAllies[index] = new CSheetDnD();
        } else {
          this.dndAllies.splice(index, 1);
        }
      }
    });
  }

  private addNewDnD5eEnemie() {
    this.dndEnemies.push(new CSheetDnD());
  }

  private removeDnD5eEnemie(selectedEnemie: CSheetDnD) {
    this.dndEnemies.forEach((enemie, index) => {
      if (enemie === selectedEnemie) {
        this.removeDnD5eCombatOrder(selectedEnemie.personalInfo.characterName);
        if (index <= this.partyNumber) {
          this.dndEnemies[index] = new CSheetDnD();
        } else {
          this.dndEnemies.splice(index, 1);
        }
      }
    });
  }

  private addNewDnD5eSpell() {
    this.dndSpellsTime.push(new CSpellTime());
  }

  private removeDnD5eSpell(selectedSpell: CSpellTime) {
    this.dndSpellsTime.forEach((spell, index) => {
      if (spell === selectedSpell) {
        if (index === 0) {
          this.dndSpellsTime[index] = new CSpellTime();
        } else {
          this.dndSpellsTime.splice(index, 1);
        }
      }
    });
  }

  private addDnD5eCombatOrder(name: string, table: number) {
    this.combatOrder.push(new CCombatInitiative(name));

    if (table === 0) {
      this.addNewDnD5eAllie();
    } else {
      this.addNewDnD5eEnemie();
    }
  }

  private removeDnD5eCombatOrder(name: string) {
    this.combatOrder.forEach((character, index) => {
      if (character.name === name) {
        this.combatOrder.splice(index, 1);
      }
    });
  }

  private sortCombatOrder() {
    this.combatOrder.sort((a, b) => b.initiative - a.initiative);
  }

  private sortSpellsTime() {
    this.dndSpellsTime.sort((a, b) => b.time - a.time);
  }

}
