import { CRun } from './CRun';
import { CAccount } from './CAccount';
import { CSheetDnD } from './sheets/CSheetDnD';
export class CPlayerSheet{
  id : number = 0;
  account : CAccount = new CAccount();
  run : CRun = new CRun();
  sheetDnD : CSheetDnD = new CSheetDnD();
  dataCriacao : Date = new Date();
}
