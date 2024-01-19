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
import { DndSheetComponent } from './pages/sheet/dnd/dndSheet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './pages/sheet/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalCancelComponent } from './pages/sheet/modal-cancel/modal-cancel.component';
import { ModalCreateComponent } from './pages/sheet/modal-create/modal-create.component';
import { ModalErrorComponent } from './pages/sheet/modal-error/modal-error.component';
import { ModalErrorLoginComponent } from './pages/login/modal-error-login/modal-error-login.component';
import { ModalErrorCreateAccountComponent } from './pages/create-account/modal-error-create-account/modal-error-create-account.component';
import { ModalSucessCreateAccountComponent } from './pages/create-account/modal-sucess-create-account/modal-sucess-create-account.component';
import { ModalSucessEditAccountComponent } from './pages/account-settings/modal-sucess-edit-account/modal-sucess-edit-account.component';
import { ModalErrorEditAccountComponent } from './pages/account-settings/modal-error-edit-account/modal-error-edit-account.component';
import { ModalConfirmComponent } from './pages/my-sheets/modal-confirm/modal-confirm.component';
import { ModalSucessDeleteSheetComponent } from './pages/my-sheets/modal-sucess-delete-sheet/modal-sucess-delete-sheet.component';
import { ModalErrorDeleteSheetComponent } from './pages/my-sheets/modal-error-delete-sheet/modal-error-delete-sheet.component';

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
    ModalErrorComponent,
    ModalErrorLoginComponent,
    ModalErrorCreateAccountComponent,
    ModalSucessCreateAccountComponent,
    ModalSucessEditAccountComponent,
    ModalErrorEditAccountComponent,
    ModalConfirmComponent,
    ModalSucessDeleteSheetComponent,
    ModalErrorDeleteSheetComponent,
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
