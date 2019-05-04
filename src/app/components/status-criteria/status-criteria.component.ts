import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-status-criteria',
  templateUrl: './status-criteria.component.html',
  styleUrls: ['./status-criteria.component.css']
})
export class StatusCriteriaComponent implements OnInit {

  pointName: string;
  onValue: number;
  offValue: number;


  constructor() {
  }

  ngOnInit() {
  }

}
