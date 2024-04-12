import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  teamMembers$ = this._httpService.getTeamMockData();

  constructor(
    private _httpService: HttpService
  ) { }

  ngOnInit(): void {
  }


}
