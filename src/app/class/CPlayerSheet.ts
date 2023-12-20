import { CRun } from './CRun';
import { CAccount } from './CAccount';
import { CSheetDnD } from './CSheetDnD';
export class CPlayerSheet{
  id : number = 0;
  account : CAccount = new CAccount();
  run : CRun = new CRun();
  dataCriacao : Date = new Date();
}
