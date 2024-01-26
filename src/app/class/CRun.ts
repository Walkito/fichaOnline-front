import { CAccount } from "./CAccount";
import { CSystem } from "./CSystem";

export class CRun{
  id : number = 0;
  campaign : string = "";
  system : CSystem = new CSystem();
  status : string = "";
  dateBeginning : Date = new Date();
  dateEnding : Date = new Date();
  masterId: number = 0;
  masterName: string = "";
  opened : boolean = false;
  accounts: CAccount[] = [];
}
