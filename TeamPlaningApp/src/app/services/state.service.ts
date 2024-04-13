import { Injectable } from '@angular/core';
import { Calendar } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  calendarApi?: Calendar;

  constructor() { }

}
