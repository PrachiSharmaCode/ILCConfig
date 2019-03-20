import {Component, Input, OnInit} from '@angular/core';
import {ILCCongig} from "../../model/ILCConfig.model";

@Component({
  selector: 'app-criteria-config',
  templateUrl: './criteria-config.component.html',
  styleUrls: ['./criteria-config.component.css']
})
export class CriteriaConfigComponent implements OnInit {

  @Input() ilc: ILCCongig;
  devices: string[];
  campus: string;
  building: string;
  stageName: string;
  criteriaList: string[];

  constructor() { }

  ngOnInit() {
    this.devices = this.ilc.devices;
    this.campus = this.ilc.campus;
    this.building =  this.ilc.building;
    this.criteriaList = this.ilc.pairwiseCriteriaList;
  }

  trackByIndex(index: number): any {
    return index;
  }

}
