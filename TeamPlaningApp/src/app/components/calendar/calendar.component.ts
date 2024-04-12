import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions, DateSelectArg, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CreateMissionDialogComponent } from './create-mission-dialog/create-mission-dialog.component';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {


  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendarApi?: Calendar;

  events = [
    {
      title: 'Event',
      start: '2024-04-01',
      avatar: 'https://i.pravatar.cc/40',
    },

    {
      title: 'Event',
      start: '2024-04-03',
      avatar: 'https://i.pravatar.cc/40',
    }
  ];

  calendarOptions: CalendarOptions = {

    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin
    ],

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,

    locales: [
      {
        code: 'fr',
        buttonText: {
          today: 'Aujourd\'hui',
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
          list: 'Liste'

        },
      }

    ],

    allDayText: "Toute la journée",
    noEventsText: "Aucun évènement",


    select: (info: DateSelectArg) => {
      this.handleSelectDate(info)
    },

    eventMouseEnter: (arg) => {
      console.log('eventMouseEnter ' + arg.event.title + arg.el);
    },

  };



  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent?.getApi();
  }

  handleSelectDate(info: DateSelectArg): void {
    this.dialog.open(CreateMissionDialogComponent, {
      data: {
        animal: 'panda',
      },
    });
  }


  toggleWeekends(): void {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }

  onAddEvent(start: string): void {



    this.calendarApi?.addEvent(
      {
        title: 'New Event',
        start: start, editable: true,
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
