import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamMember } from '../interfaces/team-member';
import { MissionEvent } from '../interfaces/mission-event';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly GET_TEAM_MOCK_DATA_URL = '../../assets/Data/TEAM_MOCK_DATA.json';
  private readonly GET_MISSION_EVENT_MOCK_DATA_URL = '../../assets/Data/MISSION_EVENT_MOCK_DATA.json';


  constructor(
    private _http: HttpClient
  ) { }

  getTeamMockData(): Observable<TeamMember[]> {
    return this._http.get<TeamMember[]>(this.GET_TEAM_MOCK_DATA_URL);
  }

  getMissionEventMockData(): Observable<MissionEvent[]> {
    return this._http.get<MissionEvent[]>(this.GET_MISSION_EVENT_MOCK_DATA_URL);
  }


}
