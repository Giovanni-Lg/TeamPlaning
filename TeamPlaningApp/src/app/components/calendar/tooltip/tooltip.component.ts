import { Component, Input, OnInit } from '@angular/core';
import { MissionEvent } from 'src/app/interfaces/mission-event';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {


  @Input() argEvent?: MissionEvent;


  constructor() { }

  ngOnInit(): void {
  }

}
