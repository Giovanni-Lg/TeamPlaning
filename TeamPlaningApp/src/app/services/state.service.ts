import { Injectable } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { MissionEvent } from '../interfaces/mission-event';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  calendarApi?: Calendar;
  event?: MissionEvent [];


  constructor() { }

}
