import { AfterViewInit, Component, ElementRef, OnInit, PipeTransform, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute } from '@angular/router';
import { CAccount } from 'src/app/class/CAccount';
import { MyRunsService } from './my-runs.service';
import { CRun } from 'src/app/class/CRun';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { CPlayerSheet } from 'src/app/class/CPlayerSheet';
import { CErro } from 'src/app/class/CErro';
import * as moment from 'moment';
import { format } from 'date-fns';

@Component({
  selector: 'app-my-runs',
  templateUrl: './my-runs.component.html',
  styleUrls: ['./my-runs.component.scss']
})
export class MyRunsComponent implements AfterViewInit{
  constructor(private service: MyRunsService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private sessionStorage: SessionStorageService) { }

  @ViewChildren('circle') circlesSpans: QueryList<ElementRef> = new QueryList<ElementRef>;
  @ViewChildren('imgButton') buttons: QueryList<ElementRef> = new QueryList<ElementRef>;
  account: CAccount = new CAccount();
  runs: CRun[] = [];
  charactersNames: string[][] = [];

  async ngAfterViewInit() {
    this.account = this.sessionStorage.getData('account');
    await this.getLinkedRuns();

    this.populateCharacterNames();
    this.paintRunStatus();
  }

  private getMasterName(idRun: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.service.getMasterRun(idRun).subscribe({
        next: (masterName: CRun) => resolve(masterName.masterName),
        error: (error: CErro) => {
          this.utils.showError(error);
          reject(error);
        }
      })

    })
  }

  private getLinkedAccounts(idRun: number): Promise<CAccount[]> {
    return new Promise<CAccount[]>((resolve, reject) => {
      this.service.getLinkedAccounts(idRun).subscribe({
        next: (accounts: CAccount[]) => resolve(accounts),
        error: (error: CErro) => {
          this.utils.showError(error);
          reject(error);
        }
      })
    });
  }

  private async getLinkedRuns(): Promise<void> {
    return await new Promise<void>((resolve, reject) => {
      this.service.getLinkedRuns(this.account.id).subscribe({
        next: (runs) => {
          this.runs = runs;
          this.runs.forEach(async run => {
            run.accounts = await this.getLinkedAccounts(run.id);
            run.masterName = await this.getMasterName(run.masterId);
          });
          resolve();
        },
        error: (error) => {
          this.utils.showError(error);
          reject();
        }
      })
    })
  }

  openRunInfo(index: number) {
    const run = this.runs.at(index);
    const button = this.buttons.toArray()[index];

    if (run) {
      run.opened = run.opened === true ? false : true;
    }
  }

  private getCharacterNames(idRun: number): Promise<string[]> {
    return new Promise<string[]>(async (resolve) => {
      let characterNames: string[] = [];
      const sheets = await this.getSheets(idRun);
      sheets.forEach(sheet => {
        if (sheet.sheetDnD) {
          characterNames.push(sheet.sheetDnD.personalInfo.characterName);
        }
      });
      resolve(characterNames);
    });
  }

  private getSheets(idRun: number): Promise<CPlayerSheet[]> {
    return new Promise<CPlayerSheet[]>((resolve, reject) => {
      this.service.getSheets(idRun).subscribe({
        next: (sheets: CPlayerSheet[]) => {
          resolve(sheets);
        },
        error: (error: CErro) => {
          this.utils.showError(error);
          reject(error);
        }
      });
    })
  }

  private verifyRunStatus(run: CRun, index: number) {
    const circle = this.circlesSpans.toArray()[index];
    if (circle) {
      switch (run.status) {
        case 'Concluída':
          circle.nativeElement.style.backgroundColor = 'var(--buttonGreen)';
          break;
        case 'Em Andamento':
          circle.nativeElement.style.backgroundColor = 'var(--cleanYellow)';
          break;
        case 'Interrompida':
          circle.nativeElement.style.backgroundColor = 'var(--buttonRed)';
          break;
        case 'Cancelada':
          circle.nativeElement.style.backgroundColor = 'black';
          break;
      }
    }
  }

  private async populateCharacterNames() {
    for (const run of this.runs) {
      const runCharacterNames = await this.getCharacterNames(run.id);
      this.charactersNames.push(runCharacterNames);
    }
  }

  private paintRunStatus() {
    setTimeout(() => {
      this.runs.forEach((run: CRun, index: number) => {
        this.verifyRunStatus(run, index);
      });
    }, 0);
  }
}
