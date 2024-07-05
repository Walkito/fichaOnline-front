import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { ModalConfirmDeleteAccountComponent } from './pages/account-settings/modal-confirm-delete-account/modal-confirm-delete-account.component';
import { ModalErrorDeleteAccountComponent } from './pages/account-settings/modal-error-delete-account/modal-error-delete-account.component';
import { ModalErrorEditAccountComponent } from './pages/account-settings/modal-error-edit-account/modal-error-edit-account.component';
import { ModalSucessDeleteAccountComponent } from './pages/account-settings/modal-sucess-delete-account/modal-sucess-delete-account.component';
import { ModalSucessEditAccountComponent } from './pages/account-settings/modal-sucess-edit-account/modal-sucess-edit-account.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { ModalErrorCreateAccountComponent } from './pages/create-account/modal-error-create-account/modal-error-create-account.component';
import { ModalSucessCreateAccountComponent } from './pages/create-account/modal-sucess-create-account/modal-sucess-create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ModalErrorLoginComponent } from './pages/login/modal-error-login/modal-error-login.component';
import { MasterAreaComponent } from './pages/master-area/master-area.component';
import { ModalCreateRunComponent } from './pages/master-area/modal-create-run/modal-create-run.component';
import { MyRunsComponent } from './pages/my-runs/my-runs.component';
import { ModalAddSheetComponent } from './pages/my-sheets/modal-add-sheet/modal-add-sheet.component';
import { ModalConfirmComponent } from './pages/my-sheets/modal-confirm/modal-confirm.component';
import { ModalErrorDeleteSheetComponent } from './pages/my-sheets/modal-error-delete-sheet/modal-error-delete-sheet.component';
import { ModalSucessDeleteSheetComponent } from './pages/my-sheets/modal-sucess-delete-sheet/modal-sucess-delete-sheet.component';
import { MySheetsComponent } from './pages/my-sheets/my-sheets.component';
import { DndSheetComponent } from './pages/sheet/dnd/dndSheet.component';
import { ModalCancelComponent } from './pages/sheet/modal-cancel/modal-cancel.component';
import { ModalCreateComponent } from './pages/sheet/modal-create/modal-create.component';
import { ModalErrorComponent } from './pages/sheet/modal-error/modal-error.component';
import { ModalComponent } from './pages/sheet/modal/modal.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MasterRunComponent } from './pages/master-run/master-run.component';
import { ModalSelectRunComponent } from './pages/master-area/modal-select-run/modal-select-run.component';
import { ModalChangeStatusComponent } from './pages/master-run/modal-change-status/modal-change-status.component';
import { ModalCancelRunComponent } from './pages/master-run/modal-cancel-run/modal-cancel-run.component';
import { ModalAddPlayerComponent } from './pages/master-run/modal-add-player/modal-add-player.component';
import { ModalConfirmRemovePlayerComponent } from './pages/master-run/modal-confirm-remove-player/modal-confirm-remove-player.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { HttpInterceptorModule } from './modules/interceptor.module';
import { ModalErrorTokenComponent } from './utils/modal-error-token/modal-error-token/modal-error-token.component';
import { DatetimePipe } from './utils/datetime.pipe';
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
    ModalConfirmDeleteAccountComponent,
    ModalSucessDeleteAccountComponent,
    ModalErrorDeleteAccountComponent,
    ModalAddSheetComponent,
    MasterAreaComponent,
    ModalCreateRunComponent,
    MasterRunComponent,
    ModalSelectRunComponent,
    ModalChangeStatusComponent,
    ModalCancelRunComponent,
    ModalAddPlayerComponent,
    ModalConfirmRemovePlayerComponent,
    ModalErrorTokenComponent,
    DatetimePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ClipboardModule,
    HttpInterceptorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
