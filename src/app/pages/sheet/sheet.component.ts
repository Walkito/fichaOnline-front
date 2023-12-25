import { Component } from '@angular/core';
import { SheetService } from './sheet.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { Router } from '@angular/router';
import { CSheetDnD } from 'src/app/class/sheets/CSheetDnD';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss']
})
export class SheetComponent {
  constructor(private service: SheetService, private utils: UtilsService, private router:Router){}

  sheetDnD : CSheetDnD = new CSheetDnD();

  cancelSheet(){
    //TO DO caixa de confirmação se realmente quer cancelar a ficha;
    this.router.navigate(['/home/my-sheets']);
  }

}
