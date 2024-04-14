import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateSelectArg, EventSourceInput } from '@fullcalendar/core';
import { MissionFormGroup } from 'src/app/form-group/mission-form';
import { Mission } from 'src/app/interfaces/mission';
import { TeamMember } from 'src/app/interfaces/team-member';
import { DateService } from 'src/app/services/date.service';
import { HttpService } from 'src/app/services/http.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-update-delete-mission-dialog',
  templateUrl: './update-delete-mission-dialog.component.html',
  styleUrls: ['./update-delete-mission-dialog.component.scss']
})
export class UpdateDeleteMissionDialogComponent implements OnInit {

  missionFormGroup = new MissionFormGroup();
  calendarApi = this._statService.calendarApi;
  teamMembers$ = this._httpService.getTeamMockData();
  teamMember?: TeamMember;


  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedMission: Mission,
    private _dateService: DateService,
    private _statService: StateService,
    private _httpService: HttpService
  ) { }


  ngOnInit(): void {

    const selectedMissionCopy = {
      id: this.selectedMission.id,
      start_date: this._dateService.formatDateTo_AAAA_MM_JJ(new Date(this.selectedMission.start_date)),
      end_date: this._dateService.formatDateTo_AAAA_MM_JJ(new Date(this.selectedMission.end_date)),
      all_day: this.selectedMission.all_day,
      start_hour: this._dateService.formatTimeTo_HH_MM(new Date(this.selectedMission.start_date)),
      end_hour: this._dateService.formatTimeTo_HH_MM(new Date(this.selectedMission.end_date)),
      title: this.selectedMission.title,
      description: this.selectedMission.description,
      color: this.selectedMission.color,
      teamMember: this.selectedMission.teamMember
    }
    this.teamMember = this.selectedMission.teamMember;

    this.missionFormGroup.patchValue(selectedMissionCopy);
  }

  onUpdateMission(): void {

    const mission: Mission = this.missionFormGroup.value;

    const startDate = this._dateService.createDate(mission.start_date, mission.start_hour);
    const endDate = this._dateService.createDate(mission.end_date, mission.end_hour);

    const newEvent =
    {
      id: mission.id,
      title: mission.title,
      description: mission.description,
      start: startDate,
      editable: true,
      end: endDate,
      allDay: mission.all_day,
      backgroundColor: mission.color,
      id_teamMember: mission,
      teamMember: mission.teamMember
    };

    let eventsStat = this._statService.event;
    eventsStat = eventsStat?.filter((event) => event.id !== this.selectedMission.id);
    eventsStat?.push(newEvent);
    this._statService.event = eventsStat;

    this.calendarApi?.removeAllEvents();
    this.calendarApi?.addEventSource(eventsStat as EventSourceInput);

    console.log('Changement :', newEvent);
  }


  onDeleteMission(): void {
    let eventsStat = this._statService.event;
    eventsStat = eventsStat?.filter((event) => event.id !== this.selectedMission.id);
    this._statService.event = eventsStat;
    this.calendarApi?.removeAllEvents();
    this.calendarApi?.addEventSource(eventsStat as EventSourceInput);
    console.log('Changement :', this.selectedMission);


  }


}
