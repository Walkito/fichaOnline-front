import { Component } from '@angular/core';
import { SheetService } from './dndSheet.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { Router } from '@angular/router';
import { CSheetDnD } from 'src/app/class/sheets/CSheetDnD';

@Component({
  selector: 'app-sheet',
  templateUrl: './dndSheet.component.html',
  styleUrls: ['./dndSheet.component.scss']
})
export class DndSheetComponent {
  constructor(private service: SheetService, private utils: UtilsService, private router:Router){}

  sheetDnD : CSheetDnD = new CSheetDnD();
  private idSheet = 0;

  ngOnInit(){
    this.idSheet = this.utils.getSheetId();
    this.getSheet();
  }

  cancelSheet(){
    //TO DO caixa de confirmação se realmente quer cancelar a ficha;
    this.router.navigate(['/home/my-sheets']);
  }

  getSheet(){
    this.service.getSheet(this.idSheet).subscribe({
      next: (sheet) => {
        this.sheetDnD = sheet;
      },
      error: (error) => this.utils.showError(error)
    });
  }
}
