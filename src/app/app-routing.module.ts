import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { MyRunsComponent } from './pages/my-runs/my-runs.component';
import { MySheetsComponent } from './pages/my-sheets/my-sheets.component';
import { DndSheetComponent } from './pages/sheet/dnd/dndSheet.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "create-account", component: CreateAccountComponent},
  {path: "home", component: HomeComponent},
  {path: "home/account-settings", component: AccountSettingsComponent},
  {path: "home/my-runs", component: MyRunsComponent},
  {path: "home/my-sheets", component: MySheetsComponent},
  {path: "home/my-sheets/dnd-sheet", component: DndSheetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
