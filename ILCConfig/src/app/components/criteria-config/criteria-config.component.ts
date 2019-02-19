import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criteria-config',
  templateUrl: './criteria-config.component.html',
  styleUrls: ['./criteria-config.component.css']
})
export class CriteriaConfigComponent implements OnInit {

  ctriteria = ['HP1', 'HP2', 'HP3', 'HP4', 'HP5', 'HP6', 'HP7', 'HP8', 'HP9', 'HP10']

  constructor() { }

  ngOnInit() {
  }

}
