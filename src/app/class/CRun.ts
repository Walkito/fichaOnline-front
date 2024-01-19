import { CSystem } from "./CSystem";

export class CRun{
  id : string = "";
  campaign : string = "";
  system : CSystem = new CSystem();
  opened : boolean = false;
}
