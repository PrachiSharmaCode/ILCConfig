import {Component, Input, OnInit} from '@angular/core';
import {ILCCongig} from '../../model/ILCConfig.model';
import {PairwiseModel} from '../../model/pairwise.model';
import {CriteriaModel} from '../../model/criteria.model';

@Component({
  selector: 'app-criteria-config',
  templateUrl: './criteria-config.component.html',
  styleUrls: ['./criteria-config.component.css']
})
export class CriteriaConfigComponent implements OnInit {

  @Input() ilc: ILCCongig;
  @Input() pairwise: PairwiseModel;
  @Input() criteria: CriteriaModel
  devices: string[];
  campus: string;
  building: string;
  stageName: string;
  operation: string[];
  arguments: string[];
  criteriaList: string[];

  constructor() { }

  checkop() {
    console.log(this.operation);
  }

  ngOnInit() {
    this.devices = this.ilc.devices;
    this.campus = this.ilc.campus;
    this.building =  this.ilc.building;
    this.stageName = this.criteria.stageName;
    this.operation =  this.criteria.operation;
    this.arguments =  this.criteria.arguments;
    this.criteriaList = this.pairwise.pairwiseCriteriaList;
  }

  trackByIndex(index: number): any {
    return index;
  }

}
