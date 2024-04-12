import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg } from '@fullcalendar/core';
import { MissionFormGroup } from 'src/app/form-group/mission-form';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-create-mission-dialog',
  templateUrl: './create-mission-dialog.component.html',
  styleUrls: ['./create-mission-dialog.component.scss']
})
export class CreateMissionDialogComponent implements OnInit {

  missionFormGroup = new MissionFormGroup();

  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedDate: DateSelectArg,
    private _dateService: DateService
  ) { }


  ngOnInit(): void {

    console.log(this.selectedDate);
    const selectedDateOnCalendar = {
      start_date: this._dateService.formatDateTo_AAAA_MM_JJ(this.selectedDate.start),
      end_date: this._dateService.formatDateTo_AAAA_MM_JJ(this.selectedDate.end, this.selectedDate.allDay),

      all_day: this.selectedDate.allDay,
      start_hour: this._dateService.formatTimeTo_HH_MM(this.selectedDate.start),
      end_hour: this._dateService.formatTimeTo_HH_MM(this.selectedDate.end),

    }

    console.log(selectedDateOnCalendar); -

      this.missionFormGroup.patchValue(selectedDateOnCalendar);
  }

  onCreateMission(): void {
    console.log(this.missionFormGroup.value);
  }

}
