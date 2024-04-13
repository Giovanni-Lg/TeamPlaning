import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  formatDateTo_AAAA_MM_JJ(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    let day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  formatTimeTo_HH_MM(date: Date) {
    let hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = hours + ':' + minutes;
    return formattedTime;
  }

  createDate(dateString: string, timeString: string): Date {
    let [year, month, day] = dateString.split('-').map(Number);
    let [hours, minutes] = timeString.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }

}
