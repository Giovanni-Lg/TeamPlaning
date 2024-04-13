import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions, DateSelectArg, EventSourceInput } from '@fullcalendar/core';
import { CreateMissionDialogComponent } from './create-mission-dialog/create-mission-dialog.component';
import { CALENDAR_OPTIONS_CONFIG } from 'src/app/calendar-option.config';
import { Mission } from 'src/app/interfaces/mission';
import { StateService } from 'src/app/services/state.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {


  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendarApi?: Calendar;

  events: EventSourceInput = [
    {
      title: 'Event',
      start: new Date(),
      avatar: 'https://i.pravatar.cc/40',
    },

    {
      title: 'Event',
      date: '2024-04-03',
      avatar: 'https://i.pravatar.cc/40',
    }
  ];

  calendarOptions: CalendarOptions = {
    ...CALENDAR_OPTIONS_CONFIG,
    ...{

      events: this.events,

      select: (selectedDate: DateSelectArg) => {
        this.handleSelectDate(selectedDate)
      },

      eventMouseEnter: (arg) => {
        console.log('eventMouseEnter ' + arg.event.title + arg.el);
      },
    }

  };



  constructor(
    private _dialog: MatDialog,
    private _stateService: StateService
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent?.getApi();
    this._stateService.calendarApi = this.calendarApi;
  }

  handleSelectDate(selectedDate: DateSelectArg): void {
    this._dialog.open(CreateMissionDialogComponent, {
      data: selectedDate
    });
  }


  toggleWeekends(): void {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }

  onAddEvent(mission: Mission): void {

    this.calendarApi?.addEvent(
      {
        title: 'New Event',
        start: mission.start_date,
        editable: true,
        end: mission.end_date,
        avatar: './../assets/john-doe.jpg',
        backgroundColor: this.randomHexColor(),
      });
  }

  randomHexColor(): string {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random()) * 256;

    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');

    const hexColor = "#" + redHex + greenHex + blueHex;

    return hexColor;
  }



}
