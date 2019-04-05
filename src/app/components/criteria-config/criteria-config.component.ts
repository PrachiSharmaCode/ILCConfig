import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ILCCongig} from '../../model/ILCConfig.model';
import {PairwiseModel} from '../../model/pairwise.model';
import {CriteriaModel} from '../../model/criteria.model';
import {FormulaCriteriaComponent} from '../formula-criteria/formula-criteria.component';

@Component({
  selector: 'app-criteria-config',
  templateUrl: './criteria-config.component.html',
  styleUrls: ['./criteria-config.component.css']
})
export class CriteriaConfigComponent implements OnInit {

  @Input() ilc: ILCCongig;
  @Input() pairwise: PairwiseModel;
  @Input() criteria: CriteriaModel;
  devices: string[];
  campus: string;
  building: string;
  stageName: string;
  operationtype: string[][];
  argument: string[];
  criteriaList: string[];
  getCriteria = false;
  getCriteriaValue: string;

  constructor() { }

  checkArg(val) {
    this.argument = val;
    console.log(this.argument);
  }

  addCriteria() {
    this.getCriteria =  true;
  }

  UpdateCriteriaList() {
    this.criteriaList.push(this.getCriteriaValue);
    this.getCriteria =  false;
    this.getCriteriaValue = '';
  }

  removeCriteria(index) {
    this.criteriaList.splice(index, 1);
  }

  ngOnInit() {
    this.devices = this.ilc.devices;
    this.campus = this.ilc.campus;
    this.building =  this.ilc.building;
    this.stageName = this.criteria.stageName;
    this.operationtype =  this.criteria.operationType;
    this.argument =  this.criteria.arguments;
    this.criteriaList = this.pairwise.pairwiseCriteriaList;
  }

  trackByIndex(index: number): any {
    return index;
  }
}
