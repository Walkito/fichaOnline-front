import { MatDialog } from '@angular/material/dialog';
import { Component, HostListener, OnInit } from '@angular/core';
import { DnDSheetService } from './dndSheet.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CSheetDnD } from 'src/app/class/sheets/CSheetDnD';
import { ModalComponent } from '../modal/modal.component';
import { ModalCancelComponent } from '../modal-cancel/modal-cancel.component';
import { CAccount } from 'src/app/class/CAccount';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { NgForm } from '@angular/forms';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { CPlayerSheet } from 'src/app/class/CPlayerSheet';
import { CRun } from 'src/app/class/CRun';
import { CErro } from 'src/app/class/CErro';
@Component({
  selector: 'app-sheet',
  templateUrl: './dndSheet.component.html',
  styleUrls: ['./dndSheet.component.scss']
})
export class DndSheetComponent implements OnInit {
  private idSheet = 0;
  typeSheet: number = 0
  private dictionaryInputs: { [key: string]: string } = {};

  sheetDnD: CSheetDnD = new CSheetDnD();
  account: CAccount = this.sessionStorage.getData('account');
  characterPictureURL: string = "assets/iconePersonagem.png";
  private run: CRun = this.sessionStorage.getData('runCreateSheet');

  constructor(private service: DnDSheetService,
    private utils: UtilsService,
    private router: Router,
    private dialog: MatDialog,
    private sessionStorage: SessionStorageService) { }

  async ngOnInit() {
    this.typeSheet = this.sessionStorage.getData('sheetType');
    this.populateDictionary();
    if (this.typeSheet === 1) {
      this.sheetDnD.personalInfo.playerName = this.account.name;
      this.changeTextButtons();
      this.updateAttributesInCreation();
    } else {
      this.idSheet = this.sessionStorage.getData('sheetId');
      this.getSheet();
      this.hideCleanButton();
      this.characterPictureURL = await this.getCharacterPicture();
    }
  }

  async choosePicture(event: any) {
    if(this.typeSheet === 1){
      alert("Não é possível selecionar uma imagem antes de criar a ficha. Por favor, crie a ficha primeiro.");
      return;
    }

    const file: File = event.target.files[0];
    const fileName: string = file.name;
    const imageData: any = await this.utils.readFile(file);
    const imageSaved: boolean = await this.saveImage(imageData, fileName);
    if (imageSaved) {
      this.characterPictureURL = await this.getCharacterPicture();
      this.sheetDnD.characterPictureFileName = fileName;
    } else {
      alert("Já existe um arquivo com este mesmo nome. Por favor, renomeie com um nome de arquivo não utilizado.");
    }
  }

  @HostListener('focusin', ['$event'])
  onFocusIn(event: FocusEvent): void {
    const elementRef = event.target as HTMLElement;
    elementRef.classList.remove(`input-blinking`);
  }

  getSheet() {
    this.service.getSheet(this.idSheet).subscribe({
      next: (sheet) => {
        this.sheetDnD = sheet;
      },
      error: (error) => this.utils.showError(error)
    });
  }

  editSheet() {
    if (this.typeSheet === 2) {
      this.service.editSheet(this.sheetDnD).subscribe({
        next: (sheet) => {
          this.sheetDnD = sheet;
        },
        error: (error) => this.utils.showError(error)
      });
    } else {
      this.updateAttributesInCreation();
    }
  }

  postSheet(form: NgForm) {
    if (form.invalid) {
      let errorsToSend: string[] = new Array();
      for (const controlName in form.controls) {
        const control = form.controls[controlName];
        if (control.errors) {
          const translateFieldName = this.translateFields(controlName);
          errorsToSend.push(this.verifyErrors(translateFieldName, control));
          this.paintComponent(controlName);
        }
      }
      this.openErrorDialog(errorsToSend);
    } else if (this.typeSheet === 1) {
      this.service.postSheet(this.sheetDnD).subscribe({
        next: async (sheet: CSheetDnD) => {
          this.sheetDnD = sheet;
          const response = await this.linkPlayerSheet();

          if (response) {
            this.router.navigate(['/home/my-sheets']);
            const dialogRef = this.dialog.open(ModalCreateComponent, {
              disableClose: true
            });
          } else {
            this.router.navigate(['/home/my-sheets']);
          }
        },
        error: (error) => this.utils.showError(error)
      });
    } else {
      this.editSheet();
    }
  }

  updateAttributesInCreation() {
    this.service.updateAttributesInCreation(this.sheetDnD).subscribe({
      next: (sheet) => {
        this.sheetDnD = sheet;
      },
      error: (error) => this.utils.showError(error)
    });
  }

  cancelSheet() {
    if (this.typeSheet === 1) {
      const modalRef = this.dialog.open(ModalCancelComponent, {
        disableClose: true,
      }).afterClosed().subscribe(option => {
        if (option === 1) {
          this.router.navigate(['/home/my-sheets']);
        }
      })
    } else {
      this.router.navigate(['/home/my-sheets']);
    }
  }

  cleanSheet() {
    this.dialog.open(ModalComponent, {
      disableClose: true
    }).afterClosed().subscribe(option => {
      if (option === 1) {
        this.sheetDnD = new CSheetDnD();
      }
    })
  }

  lostFocus(input: HTMLElement) {
    input.blur();
  }

  private getCharacterPicture(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const blob: Blob = await this.getImage();
        resolve(URL.createObjectURL(blob));
      } catch (error: any) {
        resolve("assets/iconePersonagem.png");
      }
    });
  }

  private getImage(): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      this.service.getCharacterPicture(this.idSheet).subscribe({
        next: (image: Blob) => resolve(image),
        error: (error: CErro) => {
          reject(error);
        }
      })
    })
  }

  private saveImage(imageB64: string, fileName: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const imageObject = {
        id: this.idSheet,
        imageB64: imageB64,
        fileName: fileName
      };
      this.service.uploadCharacterPicture(imageObject).subscribe({
        next: (response: boolean) => resolve(response),
        error: (error: CErro) => {
          this.utils.showError(error);
          reject(error);
        }
      });
    });
  }

  private openErrorDialog(errors: string[]) {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      data: { errors: errors },
      disableClose: true,
    })
  }

  private translateFields(field: string): string {
    return this.dictionaryInputs[field];
  }

  private populateDictionary() {
    this.dictionaryInputs['character-name-input'] = 'Nome do Personagem';
    this.dictionaryInputs['class-input'] = 'Classe';
    this.dictionaryInputs['level-input'] = 'Nível';
    this.dictionaryInputs['antecedent-input'] = 'Antecedente';
    this.dictionaryInputs['race-input'] = 'Raça';
    this.dictionaryInputs['trend-input'] = 'Tendência';
    this.dictionaryInputs['experience-input'] = 'Experiência';
    this.dictionaryInputs['strength-value'] = 'Força';
    this.dictionaryInputs['dexterity-value'] = 'Destreza';
    this.dictionaryInputs['constitution-value'] = 'Constituição';
    this.dictionaryInputs['intelligence-value'] = 'Inteligência';
    this.dictionaryInputs['wisdom-value'] = 'Sabedoria';
    this.dictionaryInputs['charisma-value'] = 'Carisma';
    this.dictionaryInputs['inspiration-input'] = 'Nome do Personagem';
    this.dictionaryInputs['proeficiency-bonus-input'] = 'Bônus de Proficiência';
    this.dictionaryInputs['armor-class-input'] = 'Classe de Armadura';
    this.dictionaryInputs['initiative-input'] = 'Iniciativa';
    this.dictionaryInputs['speed-input'] = 'Deslocamento';
    this.dictionaryInputs['total-health-points-input'] = 'P.V Totais';
    this.dictionaryInputs['actual-health-points-input'] = 'P.V Atuais';
    this.dictionaryInputs['temporary-health-points-input'] = 'P.V Temporários';
    this.dictionaryInputs['total-hits-dice-input'] = 'Dados de Vida Totais';
    this.dictionaryInputs['actual-hits-dice'] = 'Dados de Vida Atuais';
    this.dictionaryInputs['traits-input'] = 'Traços de Personalidade';
    this.dictionaryInputs['ideals-input'] = 'Ideais';
    this.dictionaryInputs['bonds-input'] = 'Vínculos';
    this.dictionaryInputs['weaknesses-input'] = 'Fraquezas';
    this.dictionaryInputs['passive-wisdom-input'] = 'Sabedoria Passiva';
    this.dictionaryInputs['others-proeficiency-input'] = 'Outras Proficiências';
    this.dictionaryInputs['equipment-input'] = 'Equipamentos';
    this.dictionaryInputs['characteristics-traits-input'] = 'Características e Traços';
    this.dictionaryInputs['character-name-input2'] = 'Nome do Personagem';
    this.dictionaryInputs['age-input'] = 'Idade';
    this.dictionaryInputs['heigth-input'] = 'Altura';
    this.dictionaryInputs['weigth-input'] = 'Peso';
    this.dictionaryInputs['eyes-input'] = 'Olhos';
    this.dictionaryInputs['skin-input'] = 'Pele';
    this.dictionaryInputs['hair-input'] = 'Cabelo';
    this.dictionaryInputs['features-traits-input'] = 'Traços Adicionais';
    this.dictionaryInputs['backstory-input'] = 'Backstory';
    this.dictionaryInputs['conjurer-class-input'] = 'Classe de Conjurador';
    this.dictionaryInputs['key-attribute-input'] = 'Habilidade Chave';
    this.dictionaryInputs['difficulty-class-input'] = 'Classe de Dificuldade';
    this.dictionaryInputs['attack-bonus'] = 'Bônus de Magia';
  }

  private paintComponent(fieldName: String) {
    const elementRef = document.querySelector(`.` + fieldName) as HTMLElement;

    elementRef.classList.add(`input-blinking`);
  }

  private hideCleanButton() {
    const cleanSheetButton = document.querySelector('.button-clear-sheet') as HTMLElement;

    if (cleanSheetButton) {
      cleanSheetButton.style.display = "none";
    }
  }

  private changeTextButtons() {
    const saveButton = document.querySelector('.button-save');
    const cancelButton = document.querySelector('.button-cancel');


    if (saveButton && cancelButton) {
      saveButton.textContent = "Criar";
      cancelButton.textContent = "Cancelar"
    }
  }

  private verifyErrors(fieldName: string, control: any): string {
    if (control.errors.required) {
      return fieldName + " é obrigatório;";
    }
    if (control.errors.minlength) {
      return fieldName + " deve possuir no mínimo " + control.errors.minlength.requiredLength + " caracteres;";
    }
    if (control.errors.maxlength) {
      return fieldName + " deve possuir no máximo " + control.errors.maxlength.requiredLength + " caracteres;";
    }
    if (control.errors.min) {
      return fieldName + " deve possuir um valor minímo de " + control.errors.min.min + ";";
    }
    if (control.errors.max) {
      return fieldName + " deve possuir um valor máximo de " + control.errors.max.max + ";";
    }
    return "Nenhum erro encontrado";
  }

  private linkPlayerSheet(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const playerSheet = new CPlayerSheet();
      this.account.role = this.sessionStorage.getData('accountRole') === '62' ? 'PLAYER' : 'MASTER';
      playerSheet.account = this.account;
      playerSheet.run = this.run;
      playerSheet.sheetDnD = this.sheetDnD;

      this.service.linkSheet(playerSheet).subscribe({
        next: (response: boolean) => resolve(response),
        error: (error: CErro) => {
          this.utils.showError;
          reject(error);
        }
      })
    })
  }
}
