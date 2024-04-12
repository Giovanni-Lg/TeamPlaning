import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../interfaces/team';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly GET_TEAM_MOCK_DATA_URL = '../../assets/Data/TEAM_MOCK_DATA.json';

  constructor(
    private _http: HttpClient
  ) { }

  getTeamMockData(): Observable<Team[]> {
    return this._http.get<Team[]>(this.GET_TEAM_MOCK_DATA_URL);
  }


}
