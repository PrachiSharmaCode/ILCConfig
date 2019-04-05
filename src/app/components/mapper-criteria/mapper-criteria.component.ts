import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapper-criteria',
  templateUrl: './mapper-criteria.component.html',
  styleUrls: ['./mapper-criteria.component.css']
})
export class MapperCriteriaComponent implements OnInit {

  distName: string;
  mapKey: string;

  constructor() { }

  ngOnInit() {
  }

}
