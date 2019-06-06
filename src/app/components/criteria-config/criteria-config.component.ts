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
  @Input() formulaModel: FormulaCriteriaModel[][] = [];
  @Input() mainModel: MainModel;
  @Input() statusModel: StatusCriteriaModel[][] = [];
  @Input() mapperModel: MapperCriteriaModel[][] = [];
  @Input() constantModel: ConstantCriteriaModel[][] = [];
  @Input() historyModel: HistoryCriteriaModel[][] = [];

  criteriaModelList: CriteriaModel[] = [];
  formulaCriteriaModel: FormulaCriteriaModel;

  clusterList: {
    cluster_name: string;
    device_criteria_file: string;
    device_curtailment_file: string;
    pairwise_criteria_file: string;
    cluster_priority: string
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

  /***Critertia Counts****/
  formulaCount = -1;

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

  fcount = 0;

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

  // addArguments(k, val) {
  //   console.log('inside add argument');
  //   console.log(this.criteriaModelList[k].formulaModel[val].argument.length);
  //   // this.criteriaModelList[k].addArgument(val);
  //   console.log(this.criteriaModelList[k].formulaModel[val].argument.length);
  // }

  addFormulaModel(k, i) {
    console.log('inside add formula');
    this.criteriaModelList[k].operationType[i] = [];
    // this.formulaModelArr[this.formulaModelArr.length] = new FormulaCriteriaModel();
  }

  updateCount(i, index, k, val) {
    if (val === 'Formula') {
      this.criteriaModelList[k].formulaModel[index][i] = new FormulaCriteriaModel();
      console.log(this.criteriaModelList[k].formulaModel);
    } else {
      this.criteriaModelList[k].formulaModel[index][i] = null;
    }

    if (val === 'status') {
      this.criteriaModelList[k].statusModel[index][i] = new StatusCriteriaModel();
      console.log(this.criteriaModelList[k].statusModel);
    } else {
      this.criteriaModelList[k].statusModel[index][i] = null;
    }

    if (val === 'mapper') {
      this.criteriaModelList[k].mapperModel[index][i] = new MapperCriteriaModel();
      console.log(this.criteriaModelList[k].mapperModel);
    } else {
      this.criteriaModelList[k].mapperModel[index][i] = null;
    }

    if (val === 'constant') {
      this.criteriaModelList[k].constantModel[index][i] = new ConstantCriteriaModel();
      console.log(this.criteriaModelList[k].constantModel);
    } else {
      this.criteriaModelList[k].constantModel[index][i] = null;
    }

    if (val === 'history') {
      this.criteriaModelList[k].historyModel[index][i] = new HistoryCriteriaModel();
      console.log(this.criteriaModelList[k].historyModel);
    } else {
      this.criteriaModelList[k].historyModel[index][i] = null;
    }
  }

  OnRefreshButton(k) {
    console.log(this.criteriaModelList[k].operationType);
    console.log('Formula Attributes');
    console.log(this.criteriaModelList[k].formulaModel);
    console.log('Status Attributes');
    console.log(this.criteriaModelList[k].statusModel);
    console.log('Mapper Attributes');
    console.log(this.criteriaModelList[k].mapperModel);
    console.log('Constant Attributes');
    console.log(this.criteriaModelList[k].constantModel);
    console.log('History Attributes');
    console.log(this.criteriaModelList[k].historyModel);
    this.criteriaModelList[k].stageName = this.stageName;
    this.criteriaModelList[k].setFinalCalulation(this.criteriaList, k);
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
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.criteriaModelList.length; i++) {
      this.criteriaModelList[i].updateOperationType([['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']]);
      for (let subCriteria = 0; subCriteria < this.devices.length; subCriteria++) {
        this.criteriaModelList[i].formulaModel[subCriteria] = [];
        this.criteriaModelList[i].statusModel[subCriteria] = [];
        this.criteriaModelList[i].historyModel[subCriteria] = [];
        this.criteriaModelList[i].mapperModel[subCriteria] = [];
        this.criteriaModelList[i].constantModel[subCriteria] = [];
      }
    }
    console.log(this.criteriaList);
  }

  ngAfterViewInit() {

  }

  trackByIndex(index: number): any {
    return index;
  }
}
