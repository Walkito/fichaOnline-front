import { CAccount } from "./CAccount";
import { CSystem } from "./CSystem";

export class CRun{
  id : number = 0;
  campaign : string = "";
  system : CSystem = new CSystem();
  status : string = "Não Iniciada";
  dateBeginning : Date = new Date();
  dateEnding : Date | null = null;
  masterId: number = 0;
  masterName: string = "";
  sessionNumber: number = 0;
  opened : boolean = false;
  annotationOne: string = "";
  annotationTwo: string = "";
  annotationThree: string = "";
  annotationFour: string = "";
  annotationFive: string = "";
  annotationSix: string = "";
  accounts: CAccount[] = [];
}
