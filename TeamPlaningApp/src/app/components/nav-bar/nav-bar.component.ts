import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberComponent } from '../member/member.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  async onOpenTeamMemberDialog() {
    this._dialog.open(MemberComponent,
      {
        position: {
          top: '5em',
          right: '1em'
        },

        panelClass: 'team-member-dialog'
      }
    );

  }

}
