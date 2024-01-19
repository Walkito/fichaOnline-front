import { Component } from '@angular/core';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute } from '@angular/router';
import { CAccount } from 'src/app/class/CAccount';
import { MyRunsService } from './my-runs.service';
import { CRun } from 'src/app/class/CRun';

@Component({
  selector: 'app-my-runs',
  templateUrl: './my-runs.component.html',
  styleUrls: ['./my-runs.component.scss']
})
export class MyRunsComponent {
  constructor(private service: MyRunsService,
    private utils: UtilsService,
    private route: ActivatedRoute) { }

  account: CAccount = new CAccount();
  runs: CRun[] = [];

  ngOnInit() {
    this.account = this.utils.getTemporaryAccountInfos();
    this.getLinkedRuns();
  }

  getLinkedRuns() {
    this.service.getLinkedRuns(this.account.id).subscribe({
      next: (run) => {
        this.runs = run;
      },
      error: (error) => this.utils.showError(error)
    })
  }

  openRunInfo(index: number) {
    const run = this.runs.at(index);
    if (run) {
      run.opened = run.opened === true ? false : true;
    }
  }
}
