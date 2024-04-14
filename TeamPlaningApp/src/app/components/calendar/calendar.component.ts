import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions, DateSelectArg, EventClickArg, EventHoveringArg, EventSourceInput } from '@fullcalendar/core';
import { CreateMissionDialogComponent } from './create-mission-dialog/create-mission-dialog.component';
import { CALENDAR_OPTIONS_CONFIG } from 'src/app/calendar-option.config';
import { StateService } from 'src/app/services/state.service';
import { HttpService } from 'src/app/services/http.service';
import { MissionEvent } from 'src/app/interfaces/mission-event';
import { Mission } from 'src/app/interfaces/mission';
import { UpdateDeleteMissionDialogComponent } from './update-delete-mission-dialog/update-delete-mission-dialog.component';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendarApi?: Calendar;

  events: EventSourceInput = [];

  getMissionEventRessourceSubscription?: Subscription;

  calendarOptions: CalendarOptions = {
    ...CALENDAR_OPTIONS_CONFIG,
    ...{

      select: (selectedDate: DateSelectArg) => {
        this.handleSelectDate(selectedDate)
      },

      eventClick: (arg) => {
        this.handleEventClick(arg)
      },

      eventMouseEnter: (arg) => {
        this.toggleTooltip(arg)
      },

      eventMouseLeave: () => {
        this.toggleTooltip();
      }
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

  ngOnDestroy(): void {
    this.getMissionEventRessourceSubscription?.unsubscribe();
  }

  handleSelectDate(selectedDate: DateSelectArg): void {
    this._dialog.open(CreateMissionDialogComponent, {
      data: selectedDate,
      maxWidth: "95vw",
    });
  }

  getMissionEventRessource(): void {
    this.getMissionEventRessourceSubscription = this._httpService.getMissionEventMockData().subscribe({
      next: (missionEvents) => {
        this.events = missionEvents as EventSourceInput;
        this.calendarApi?.addEventSource(this.events);
        this._stateService.event = this.events as MissionEvent[];
      }
    })
  }

  handleEventClick(arg: EventClickArg): void {
    const eventObj = arg.event;
   

    const selectedMission: Mission = {
      id : eventObj.id,
      title: eventObj.title,
      description: eventObj.extendedProps['description'],
      start_date: eventObj.startStr,
      end_date: eventObj.endStr,
      all_day: eventObj.allDay,
      start_hour: eventObj.startStr,
      end_hour: eventObj.endStr,
      color: eventObj.backgroundColor,
      teamMember: eventObj.extendedProps['teamMember']
    };

    this._dialog.open(UpdateDeleteMissionDialogComponent, {
      data: selectedMission,
      maxWidth: "95vw",
    });
  }


  // Tooltip

  showTooltip = false;
  argEvent?: MissionEvent;

  toggleTooltip(arg?: EventHoveringArg): void {
    this.argEvent = arg?.event as any as MissionEvent;
    if (arg) {
      this.showTooltip = true;
    }
    else {
      this.showTooltip = false;
      this.argEvent = undefined;
    }
  }
}



