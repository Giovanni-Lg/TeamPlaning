import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';


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
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    selectable: true,
    events: this.events,

    // eventContent: this.customEventContent.bind(this),

    select: (info) => {
      // alert('selected ' + info.startStr + ' to ' + info.endStr);
      console.log('selected ' + info.startStr + ' to ' + info.endStr);
      this.onAddEvent(info.startStr);
    },

    eventMouseEnter: (arg) => {
      console.log('eventMouseEnter ' + arg.event.title + arg.el);
    },

  };

  // Custom event
  // customEventContent(arg: any, createElement: any) {
  //   const content = document.createElement('div');
  //   content.classList.add('avatar-event');
  //   const title = document.createElement('span');
  //   title.innerText = arg.event.title;
  //   const avatar = document.createElement('img');
  //   avatar.src = arg.event.extendedProps.avatar;
  //   content.appendChild(avatar);
  //   content.appendChild(title);
  //   return { domNodes: [content] };
  // }


  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent?.getApi();
  }

  handleDateClick(arg: DateClickArg): void {
    console.log('clicked ' + arg.dateStr);
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
