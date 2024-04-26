import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { MyRunsComponent } from './pages/my-runs/my-runs.component';
import { MySheetsComponent } from './pages/my-sheets/my-sheets.component';
import { DndSheetComponent } from './pages/sheet/dnd/dndSheet.component';
import { MasterAreaComponent } from './pages/master-area/master-area.component';
import { MasterRunComponent } from './pages/master-run/master-run.component';
import { guardianGuard } from './utils/guardian.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  {path: "login", component: LoginComponent},
  {path: "create-account", component: CreateAccountComponent},
  {path: "home", component: HomeComponent, canActivate:[guardianGuard]},
  {path: "home/account-settings", component: AccountSettingsComponent, canActivate:[guardianGuard]},
  {path: "home/my-runs", component: MyRunsComponent, canActivate:[guardianGuard]},
  {path: "home/my-sheets", component: MySheetsComponent, canActivate:[guardianGuard]},
  {path: "home/my-sheets/dnd-sheet", component: DndSheetComponent, canActivate:[guardianGuard]},
  {path: "home/master-area", component: MasterAreaComponent, canActivate:[guardianGuard]},
  {path: "home/master-area/master-run", component: MasterRunComponent, canActivate:[guardianGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
