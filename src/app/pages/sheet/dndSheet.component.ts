import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { SheetService } from './dndSheet.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CSheetDnD } from 'src/app/class/sheets/CSheetDnD';
import { ModalComponent } from './modal/modal.component';
import { ModalCancelComponent } from './modal-cancel/modal-cancel.component';
import { CAccount } from 'src/app/class/CAccount';
import { ModalCreateComponent } from './modal-create/modal-create.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sheet',
  templateUrl: './dndSheet.component.html',
  styleUrls: ['./dndSheet.component.scss']
})
export class DndSheetComponent implements OnInit {
  sheetDnD: CSheetDnD = new CSheetDnD();
  account: CAccount = new CAccount();
  private idSheet = 0;
  private typeSheet: number = 0;
  sheetForm: FormGroup = this.formBuilder.group({
    characterName: ['', [Validators.required, Validators.maxLength(35)]]
  });;

  constructor(private service: SheetService,
    private utils: UtilsService,
    private router: Router,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.account = this.utils.getTemporaryAccountInfos();
    this.typeSheet = this.utils.getSheetType();

    if (this.typeSheet === 1) {
      this.changeTextButtons();
      this.sheetDnD.personalInfo.playerName = this.account.name;
    } else {
      this.idSheet = this.utils.getSheetId();
      this.getSheet();
      this.hideCleanButton();
    }
  }

  async getSheet() {
    this.service.getSheet(this.idSheet).subscribe({
      next: (sheet) => {
        this.sheetDnD = sheet;
      },
      error: (error) => this.utils.showError(error)
    });
  }

  async editSheet() {
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

  async postSheet() {
    if (this.sheetForm.invalid) {
      this.invalidInput();
    } else {
      if (this.typeSheet === 1) {
        this.service.postSheet(this.sheetDnD).subscribe({
          next: () => {
            this.router.navigate(['/home/my-sheets']);
            const dialogRef = this.dialog.open(ModalCreateComponent, {
              disableClose: true
            })
          },
          error: (error) => this.utils.showError(error)
        });
      } else {
        this.editSheet();
      }
    }
  }

  async updateAttributesInCreation() {
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
    const dialogRef = this.dialog.open(ModalComponent, {
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


  private invalidInput() {
    Object.keys(this.sheetForm.controls).forEach(field => {
      const fieldControl = this.sheetForm.get(field);

      if (fieldControl && fieldControl.errors) {
        if (fieldControl.invalid) {
          Object.keys(fieldControl.errors).forEach((key: string) => {
            const errors = fieldControl.errors as Record<string, any>;
            const error = errors[key];

            alert(this.utils.getCustomErrorMessage(field, key, error));
          });
        }
      }
    });
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
}
