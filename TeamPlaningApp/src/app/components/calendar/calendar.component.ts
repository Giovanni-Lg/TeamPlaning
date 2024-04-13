import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions, DateSelectArg, EventClickArg, EventSourceInput } from '@fullcalendar/core';
import { CreateMissionDialogComponent } from './create-mission-dialog/create-mission-dialog.component';
import { CALENDAR_OPTIONS_CONFIG } from 'src/app/calendar-option.config';
import { StateService } from 'src/app/services/state.service';
import { HttpService } from 'src/app/services/http.service';
import { MissionEvent } from 'src/app/interfaces/mission-event';
import { Mission } from 'src/app/interfaces/mission';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {


  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendarApi?: Calendar;

  events: EventSourceInput = [];

  calendarOptions: CalendarOptions = {
    ...CALENDAR_OPTIONS_CONFIG,
    ...{


      select: (selectedDate: DateSelectArg) => {
        this.handleSelectDate(selectedDate)
      },

      // eventMouseEnter: (arg) => {
      //   console.log('eventMouseEnter ' + arg.event.title + arg.el);
      // },

      eventClick: (arg) => {
        this.handleEventClick(arg)
      },
    }

  };


  constructor(
    private _dialog: MatDialog,
    private _stateService: StateService,
    private _httpService: HttpService,
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent?.getApi();
    this._stateService.calendarApi = this.calendarApi;
    this.getMissionEventRessource();
  }

  handleSelectDate(selectedDate: DateSelectArg): void {
    this._dialog.open(CreateMissionDialogComponent, {
      data: selectedDate
    });
  }

  getMissionEventRessource(): void {
    this._httpService.getMissionEventMockData().subscribe({
      next: (missionEvents) => {
        this.events = missionEvents as EventSourceInput;
        this.calendarApi?.addEventSource(this.events);
        this._stateService.event = this.events as MissionEvent[];
      }
    })
  }

  handleEventClick(arg: EventClickArg): void {
    const eventObj = arg.event;
    const selectedTeamMember = eventObj.extendedProps['teamMember'];

    const selectedMission : Mission = {
      title: eventObj.title,
      description: eventObj.extendedProps['description'],
      start_date: eventObj.startStr,
      end_date: eventObj.endStr,
      all_day: eventObj.allDay,
      start_hour: eventObj.startStr,
      end_hour: eventObj.endStr,
      color: eventObj.backgroundColor,
      teamMember: selectedTeamMember
    };

    console.log(selectedMission);
  }
}



