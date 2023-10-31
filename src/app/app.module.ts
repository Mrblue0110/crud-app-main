import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectorComponent } from './selector/selector.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthServiceService } from './auth-service.service';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup/popup.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { PopupcopyComponent } from './popupcopy/popupcopy.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { LinkComponent } from './link/link.component';
import { NotfoundComponent } from './notfound/notfound.component';
import {ScrollingModule} from '@angular/cdk/scrolling'; 
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PopsinerComponent } from './popsiner/popsiner.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectorComponent,
    PopupComponent,
    PopupcopyComponent,
    LinkComponent,
    NotfoundComponent,
    PopsinerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    NgIf,
    MatFormFieldModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgFor,
    MatSelectModule,
    MatNativeDatetimeModule,
    MatDatepickerModule,
    MatDatetimepickerModule,
    MatNativeDateModule,
    MatMomentDatetimeModule,
    MatDialogModule,
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    ClipboardModule,
    ScrollingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    NgxDatatableModule,
    MatIconModule
  ],
  providers: [AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
