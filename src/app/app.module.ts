import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { BlockUIModule } from 'ng-block-ui';
import { HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import { FichaRegisterComponent } from './components/modal/ficha-register/ficha-register.component';
import { ClientRegisterComponent } from './components/modal/client-register/client-register.component';
import { ProcedimentoRegisterComponent } from './components/modal/procedimento-register/procedimento-register.component';
import { ConfirmActionComponent } from './components/modal/confirm-action/confirm-action.component';
import { PlanoPipe } from './utils/plano.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FichaRegisterComponent,
    ClientRegisterComponent,
    ProcedimentoRegisterComponent,
    ConfirmActionComponent,
    PlanoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDividerModule,
    MatTableModule,
    BlockUIModule.forRoot({
      message: 'Carregando...'
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDialogModule,
    CommonModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatButtonModule,
    MatNativeDateModule, 
    MatSelectModule,
    MatCardModule
  ],
  entryComponents: [
    ConfirmActionComponent,
    ClientRegisterComponent,
    ProcedimentoRegisterComponent,
    FichaRegisterComponent,
  ],
  providers: [PlanoPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
