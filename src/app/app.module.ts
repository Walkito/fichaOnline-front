import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { MyRunsComponent } from './pages/my-runs/my-runs.component';
import { MySheetsComponent } from './pages/my-sheets/my-sheets.component';
import { DndSheetComponent } from './pages/sheet/dndSheet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './pages/sheet/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalCancelComponent } from './pages/sheet/modal-cancel/modal-cancel.component';
import { ModalCreateComponent } from './pages/sheet/modal-create/modal-create.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    HomeComponent,
    AccountSettingsComponent,
    MyRunsComponent,
    MySheetsComponent,
    DndSheetComponent,
    ModalComponent,
    ModalCancelComponent,
    ModalCreateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
