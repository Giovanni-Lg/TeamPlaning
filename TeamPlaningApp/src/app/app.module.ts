import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MemberComponent } from './components/member/member.component';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateMissionDialogComponent } from './components/calendar/create-mission-dialog/create-mission-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { UpdateDeleteMissionDialogComponent } from './components/calendar/update-delete-mission-dialog/update-delete-mission-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TooltipComponent } from './components/calendar/tooltip/tooltip.component'; 


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MemberComponent,
    CalendarComponent,
    CreateMissionDialogComponent,
    UpdateDeleteMissionDialogComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatChipsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTooltipModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
