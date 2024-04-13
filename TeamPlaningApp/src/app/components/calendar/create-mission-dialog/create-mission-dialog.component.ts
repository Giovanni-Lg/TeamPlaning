import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg, EventSourceInput } from '@fullcalendar/core';
import { MissionFormGroup } from 'src/app/form-group/mission-form';
import { Mission } from 'src/app/interfaces/mission';
import { DateService } from 'src/app/services/date.service';
import { HttpService } from 'src/app/services/http.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-create-mission-dialog',
  templateUrl: './create-mission-dialog.component.html',
  styleUrls: ['./create-mission-dialog.component.scss']
})
export class CreateMissionDialogComponent implements OnInit {

  missionFormGroup = new MissionFormGroup();
  calendarApi = this._statService.calendarApi;
  teamMembers$ = this._httpService.getTeamMockData();


  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedDate: DateSelectArg,
    private _dateService: DateService,
    private _statService: StateService,
    private _httpService: HttpService
  ) { }


  ngOnInit(): void {

    console.log(this.selectedDate);
    const selectedDateOnCalendar = {
      start_date: this._dateService.formatDateTo_AAAA_MM_JJ(this.selectedDate.start),
      end_date: this._dateService.formatDateTo_AAAA_MM_JJ(this.selectedDate.end),

      all_day: this.selectedDate.allDay,
      start_hour: this._dateService.formatTimeTo_HH_MM(this.selectedDate.start),
      end_hour: this._dateService.formatTimeTo_HH_MM(this.selectedDate.end),
    }

    console.log(selectedDateOnCalendar);

    this.missionFormGroup.patchValue(selectedDateOnCalendar);
  }

  onCreateMission(): void {
    const mission: Mission = this.missionFormGroup.value;

    const startDate = this._dateService.createDate(mission.start_date, mission.start_hour);
    const endDate = this._dateService.createDate(mission.end_date, mission.end_hour);

    const newEvent =
    {
      id: 5,
      title: mission.title,
      description: mission.description,
      start: startDate,
      editable: true,
      end: endDate,
      avatar: './../assets/john-doe.jpg',
      allDay: mission.all_day,
      backgroundColor: mission.color,
      id_teamMember: mission,
      teamMember: mission.teamMember
    };

    const eventsStat = this._statService.event;
    eventsStat?.push(newEvent)

    this.calendarApi?.removeAllEvents();
    this.calendarApi?.addEventSource(eventsStat as EventSourceInput);


  }


}
