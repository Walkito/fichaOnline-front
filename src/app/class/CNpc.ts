import { CRun } from "./CRun";

export class CNpc{
  id: number = 0;
  name: string = "";
  race: string = "";
  whatDo: string = "";
  location: string = "";
  session: string = "";
  run: CRun = new CRun;
}
