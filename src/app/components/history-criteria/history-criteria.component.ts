import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-history-criteria',
  templateUrl: './history-criteria.component.html',
  styleUrls: ['./history-criteria.component.css']
})
export class HistoryCriteriaComponent implements OnInit {

  comparisonType: string;
  pointName: string;
  previousTime: number;
  minimum: number;
  maximum: number;

  constructor() {
  }

  ngOnInit() {
  }
}
