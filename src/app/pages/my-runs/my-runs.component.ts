import { Component } from '@angular/core';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute } from '@angular/router';
import { CAccount } from 'src/app/class/CAccount';
import { MyRunsService } from './my-runs.service';

@Component({
  selector: 'app-my-runs',
  templateUrl: './my-runs.component.html',
  styleUrls: ['./my-runs.component.scss']
})
export class MyRunsComponent {
  constructor(private service:MyRunsService,
    private utils:UtilsService,
    private route:ActivatedRoute){}

    account : CAccount = new CAccount();

    ngOnInit(){
      this.account = this.utils.getTemporaryAccountInfos();
    }
}
