import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg } from '@fullcalendar/core';
import { MissionFormGroup } from 'src/app/form-group/mission-form';
import { Mission } from 'src/app/interfaces/mission';
import { DateService } from 'src/app/services/date.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-create-mission-dialog',
  templateUrl: './create-mission-dialog.component.html',
  styleUrls: ['./create-mission-dialog.component.scss']
})
export class CreateMissionDialogComponent implements OnInit {

  missionFormGroup = new MissionFormGroup();
  calendarApi = this._statService.calendarApi;

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedDate: DateSelectArg,
    private _dateService: DateService,
    private _statService: StateService,
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

    this.calendarApi?.addEvent(
      {
        title: mission.title,
        description: mission.description,
        start: startDate,
        editable: true,
        end: endDate,
        avatar: './../assets/john-doe.jpg',
        allDay: mission.all_day,
        backgroundColor: mission.color,
      });
  }

}
