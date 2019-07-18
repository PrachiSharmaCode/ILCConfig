import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
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
export class CriteriaConfigComponent implements OnInit {

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

  criteriaList: string[][] = [];
  showCriteriaConfiguartion: boolean;
  getCriteria = false;
  getCriteriaValue: string;

  formula: {
    argument: string[],
    operation: string,
    minimum: number,
    maximum: number
  }[] = [];


  status: {
    pointName: string,
    onValue: string,
    OffValue: string
  }[] = [];


  mapper: {
    mapKey: string,
    distName: string
  };

  /***constant***/
  value: number;
  constant: {
    value: number
  };


  history: {
    comparisonType: string,
    historyPointName: string,
    previousTime: string,
    maximum: number,
    minimum: number,
  };

  constructor() {
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
    this.criteriaModelList[k].stageName = this.stageName;
    this.criteriaModelList[k].setFinalCalulation(this.criteriaList, k);
  }


  ngOnInit() {

    this.criteriaModelList = this.mainModel.criteriaModelList;
    this.criteriaList = this.mainModel.paireiseCriteriaList;
    this.clusterList = this.ilc.clusterList;
    this.showCriteriaConfiguartion = this.clusterList.length !== 0;
    this.devices = this.ilc.devices;
    this.campus = this.ilc.campus;
    this.building = this.ilc.building;
    this.stageName = this.criteria.stageName;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.criteriaModelList.length; i++) {
      if (this.criteriaModelList[i].operationType === undefined) {
        this.criteriaModelList[i].updateOperationType([['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']]);
      }
      for (let subCriteria = 0; subCriteria < this.devices.length; subCriteria++) {
        console.log(this.criteriaModelList[i].formulaModel);
        if (this.criteriaModelList[i].formulaModel[subCriteria] === undefined) {
          this.criteriaModelList[i].formulaModel[subCriteria] = [];
        }
        if ( this.criteriaModelList[i].statusModel[subCriteria] === undefined) {
          this.criteriaModelList[i].statusModel[subCriteria] = [];
        }
        this.criteriaModelList[i].historyModel[subCriteria] = [];
        this.criteriaModelList[i].mapperModel[subCriteria] = [];
        this.criteriaModelList[i].constantModel[subCriteria] = [];
      }
    }
    console.log(this.criteriaList);
  }

  trackByIndex(index: number): any {
    return index;
  }
}
