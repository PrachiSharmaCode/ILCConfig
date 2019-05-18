import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ILCCongig} from '../../model/ILCConfig.model';
import {PairwiseModel} from '../../model/pairwise.model';
import {CriteriaModel} from '../../model/criteria.model';

import {FormulaCriteriaModel} from '../../model/formulaCriteria.model';
import {MainModel} from '../../model/main.model';
import {StatusCriteriaModel} from '../../model/statusCriteria.model';
import {MapperCriteriaModel} from '../../model/mapperCriteria.model';
import {ConstantCriteriaModel} from '../../model/constantCriteria.model';
import {HistoryCriteriaModel} from '../../model/historyCriteria.model';

@Component({
  selector: 'app-criteria-config',
  templateUrl: './criteria-config.component.html',
  styleUrls: ['./criteria-config.component.css']
})
export class CriteriaConfigComponent implements OnInit, AfterViewInit {

  @Input() ilc: ILCCongig;
  @Input() pairwise: PairwiseModel;
  @Input() criteria: CriteriaModel;
  @Input() formulaModel: FormulaCriteriaModel = new FormulaCriteriaModel();
  @Input() mainModel: MainModel;
  @Input() statusModel: StatusCriteriaModel;
  @Input() mapperModel: MapperCriteriaModel;
  @Input() constantModel: ConstantCriteriaModel;
  @Input() historyModel: HistoryCriteriaModel;

  criteriaModelList: CriteriaModel[] = [];
  formulaCriteriaModel: FormulaCriteriaModel;

  clusterList: {
    _deviceCriteriaFile: string;
    _deviceCurtailmentFile: string;
    _pairwiseCriteriaFile: string;
    _clusterPriority: string
  }[];

  devices: string[];
  campus: string;
  building: string;
  stageName: string;
  operationtype: string[][];
  criteriaList: string[][] = [];
  getCriteria = false;
  getCriteriaValue: string;
  finalCalulation: string;

  criteriaFile: {
    StageName: {
      deviceTopic: string,
      criteriaName: {}[]
    }[]
  };

  formulaModelArr: FormulaCriteriaModel[] = [];

  /***Formula Argumemts***/

  formula: {
    argument: string[],
    operation: string,
    minimum: number,
    maximum: number
  }[] = [];

  argument: string[] = [];
  maximun: number;
  minimum: number;
  operation: string;

  /***Status***/
  pointName: string;
  onValue: number;
  offValue: number;

  status: {
    pointName: string,
    onValue: string,
    OffValue: string
  }[] = [];

  /***mapper***/
  mapKey: string;
  distName: string;

  mapper: {
    mapKey: string,
    distName: string
  };

  /***constant***/
  value: number;
  constant: {
    value: number
  };

  /***history***/
  comparisonType: string;
  historyPointName: string;
  previousTime: string;
  historyMaximum: number;
  historyMinimum: number;

  history: {
    comparisonType: string,
    historyPointName: string,
    previousTime: string,
    maximum: number,
    minimum: number,
  };

  constructor() {
  }

  addArguments(k) {
    console.log('inside add argument');
    console.log(this.criteriaModelList[k].formulaModel.argument.length);
    this.criteriaModelList[k].addArgument();
    console.log(this.criteriaModelList[k].formulaModel.argument.length);
  }

  addFormulaModel(k, i) {
    console.log('inside add formula');
    this.criteriaModelList[k].operationType[i] = [];
    // this.formulaModelArr[this.formulaModelArr.length] = new FormulaCriteriaModel();
  }

  OnRefreshButton(k) {
    console.log(this.criteriaModelList[k].operationType);
    console.log('Formula Attributes');
    console.log(this.criteriaModelList[k].formulaModel.print());
    console.log('Status Attributes');
    console.log(this.criteriaModelList[k].statusModel.print());
    console.log('Mapper Attributes');
    console.log(this.criteriaModelList[k].mapperModel.print());
    console.log('Constant Attributes');
    console.log(this.criteriaModelList[k].constantModel.print());
    console.log('History Attributes');
    console.log(this.criteriaModelList[k].historyModel.print());
    this.criteriaModelList[k].stageName = this.stageName;
    this.criteriaModelList[k].setFinalCalulation(this.criteriaList);
  }

  ngOnInit() {
    this.criteriaModelList = this.mainModel.criteriaModelList;
    this.criteriaList = this.mainModel.paireiseCriteriaList;
    this.clusterList = this.ilc.clusterList;
    this.devices = this.ilc.devices;
    this.campus = this.ilc.campus;
    this.building = this.ilc.building;
    this.stageName = this.criteria.stageName;

    // this.operationtype = this.criteria.operationType;
    for (let i = 0; i < this.criteriaModelList.length; i++) {
      this.criteriaModelList[i].updateOperationType([['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']]);
      console.log(this.criteriaModelList[i].operationType);
    }

    this.argument = this.formulaModel.argument;
    this.minimum = this.formulaModel.minimum;
    this.maximun = this.formulaModel.maximun;

    this.operation = this.formulaModel.operation;
    console.log(this.criteriaList);
  }

  ngAfterViewInit() {

  }

  trackByIndex(index: number): any {
    return index;
  }
}
