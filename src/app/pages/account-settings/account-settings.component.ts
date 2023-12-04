import { Component } from '@angular/core';
import { UtilsService } from 'src/app/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CAccount} from 'src/app/class/CAccount';
import { AccountSettingsService } from './account-settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  constructor(private service:AccountSettingsService,
    private utils:UtilsService,
    private router:Router,
    private route:ActivatedRoute){}

  account: CAccount = new CAccount();

  ngOnInit(){
    this.account = this.utils.getTemporaryAccountInfos();
  }

  async editAccount(){
    this.service.editAccount(this.account).subscribe({
      next: () => {
        alert("Conta atualizada com sucesso!")
        this.router.navigate(["home"])
      },
      error: (error => this.utils.showError(error))
    });
  }

}
