import {Component, Input, OnInit} from '@angular/core';
import {ILCCongig} from '../../model/ILCConfig.model';
import {PairwiseModel} from '../../model/pairwise.model';
import {CriteriaModel} from '../../model/criteria.model';

import {FormulaCriteriaModel} from '../../model/formulaCriteria.model';
import {MainModel} from '../../model/main.model';
import {StatusCriteriaModel} from '../../model/statusCriteria.model';
import {MapperCriteriaModel} from '../../model/mapperCriteria.model';
import {ConstantCriteriaModel} from '../../model/constantCriteria.model';
import {HistoryCriteriaModel} from '../../model/historyCriteria.model';
import * as FileSaver from 'file-saver';

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
  operationVal: string[][] = [];

  clusterList: {
    cluster_name: string;
    device_criteria_file: string;
    device_curtailment_file: string;
    pairwise_criteria_file: string;
    cluster_priority: string
  }[];

  devices: {
    deviceName: string;
    devicePoints: string[];
  }[][];

  deviceAndPoints: {
    deviceName: string,
    devicePoints: string[],
    checked: boolean
  }[][] = [];

  campus: string;
  building: string;
  stageName: string;

  criteriaList: string[][] = [];
  showCriteriaConfiguartion: boolean;
  getCriteria = false;
  getCriteriaValue: string;

  /***constant***/
  value: number;

  addaugment = false;

  constructor() {
  }

  updateCount(i, index, k, val) {

    if (val === 'Formula') {
      if (this.criteriaModelList[k].formulaModel[index][i] === undefined) {
        this.criteriaModelList[k].formulaModel[index][i] = new FormulaCriteriaModel();
        this.criteriaModelList[k].augmentFormulaModel[index][i] = new FormulaCriteriaModel();
      }
      this.criteriaModelList[k].formulaModel[index][i] = new FormulaCriteriaModel();
      this.criteriaModelList[k].formulaModel[index][i].getoperation_args.push('');

      this.criteriaModelList[k].augmentFormulaModel[index][i] = new FormulaCriteriaModel();
      this.criteriaModelList[k].augmentFormulaModel[index][i].getoperation_args.push('');

    } else {
      this.criteriaModelList[k].formulaModel[index][i] = null;
      this.criteriaModelList[k].augmentFormulaModel[index][i] = null;
    }

    if (val === 'status') {
      if (this.criteriaModelList[k].statusModel[index][i] === undefined) {
        this.criteriaModelList[k].statusModel[index][i] = new StatusCriteriaModel();
        this.criteriaModelList[k].augmentStatusModel[index][i] = new StatusCriteriaModel();
      }
      this.criteriaModelList[k].statusModel[index][i] = new StatusCriteriaModel();
      this.criteriaModelList[k].augmentStatusModel[index][i] = new StatusCriteriaModel();
    } else {
      this.criteriaModelList[k].statusModel[index][i] = null;
      this.criteriaModelList[k].augmentStatusModel[index][i] = null;
    }

    if (val === 'mapper') {
      if (this.criteriaModelList[k].mapperModel[index][i] === undefined) {
        this.criteriaModelList[k].mapperModel[index][i] = new MapperCriteriaModel();
        this.criteriaModelList[k].augmentMapperModel[index][i] = new MapperCriteriaModel();
      }
      this.criteriaModelList[k].mapperModel[index][i] = new MapperCriteriaModel();
      this.criteriaModelList[k].augmentMapperModel[index][i] = new MapperCriteriaModel();
    } else {
      this.criteriaModelList[k].mapperModel[index][i] = null;
      this.criteriaModelList[k].augmentMapperModel[index][i] = null;
    }

    if (val === 'constant') {
      if (this.criteriaModelList[k].constantModel[index][i] === undefined) {
        this.criteriaModelList[k].constantModel[index][i] = new ConstantCriteriaModel();
        this.criteriaModelList[k].augmentConstantModel[index][i] = new ConstantCriteriaModel();
      }
      this.criteriaModelList[k].constantModel[index][i] = new ConstantCriteriaModel();
      this.criteriaModelList[k].augmentConstantModel[index][i] = new ConstantCriteriaModel();
    } else {
      this.criteriaModelList[k].constantModel[index][i] = null;
      this.criteriaModelList[k].augmentConstantModel[index][i] = null;
    }

    if (val === 'history') {
      if (this.criteriaModelList[k].historyModel[index][i] === undefined) {
        this.criteriaModelList[k].historyModel[index][i] = new HistoryCriteriaModel();
        this.criteriaModelList[k].augmentHistoryModel[index][i] = new HistoryCriteriaModel();
      }
      this.criteriaModelList[k].historyModel[index][i] = new HistoryCriteriaModel();
      this.criteriaModelList[k].augmentHistoryModel[index][i] = new HistoryCriteriaModel();
    } else {
      if (this.criteriaModelList[k].historyModel === undefined) {
        this.criteriaModelList[k].historyModel = [];
        this.criteriaModelList[k].augmentHistoryModel = [];
      }
      this.criteriaModelList[k].historyModel[index][i] = null;
      this.criteriaModelList[k].augmentHistoryModel[index][i] = null;
    }
  }

  removeFormulaArg(k, index, i, x) {
    this.criteriaModelList[k].formulaModel[index][i].getoperation_args.splice(x, 1);
  }

  addAugmentSexction(k, index) {
    if (!this.criteriaModelList[k].showAugmentSection[index]) {
      this.criteriaModelList[k].showAugmentSection[index] = true;
      this.criteriaModelList[k].updateaugmentList(index);
      this.criteriaModelList[k].updateAugmentFormula();
    } else {
      this.criteriaModelList[k].showAugmentSection[index] = false;
    }
  }

  addOrRemove(id, e, d, k) {

    if (e.target.checked) {

      this.deviceAndPoints[k][d].checked = true;


      const temp: {
        deviceName: string,
        devicePoints: string[],
      } = {
        deviceName: this.deviceAndPoints[k][d].deviceName,
        devicePoints: this.deviceAndPoints[k][d].devicePoints,
      };

      if (this.devices[k] === undefined) {
        this.devices[k] = [];
      }
      this.devices[k].push(temp);

      this.criteriaModelList[k].updateDevceList(this.devices);
      this.ilc.updateILCDevices(this.devices);

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.criteriaModelList.length; i++) {
        if (this.criteriaModelList[i].operationType === undefined) {
          this.criteriaModelList[i].operationType = [];
        }
        this.criteriaModelList[i].operationType.push(['', '', '', '', '']);
      }
    } else {
      this.deviceAndPoints[k][d].checked = false;
      let count = 0;

      for (let j = 0; j < this.devices[k].length; j++) {
        if (this.devices[k][j].deviceName === id) {
          this.devices[k].splice(j, 1);
          count = j;
          break;
        }
      }
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.criteriaModelList.length; i++) {
        this.criteriaModelList[i].formulaModel.splice(count, 1);
        this.criteriaModelList[i].statusModel.splice(count, 1);
        this.criteriaModelList[i].historyModel.splice(count, 1);
        this.criteriaModelList[i].mapperModel.splice(count, 1);
        this.criteriaModelList[i].constantModel.splice(count, 1);
        this.criteriaModelList[i].operationType.splice(count, 1);

        this.criteriaModelList[i].augmentFormulaModel.splice(count, 1);
        this.criteriaModelList[i].augmentStatusModel.splice(count, 1);
        this.criteriaModelList[i].augmentHistoryModel.splice(count, 1);
        this.criteriaModelList[i].augmentMapperModel.splice(count, 1);
        this.criteriaModelList[i].augmentConstantModel.splice(count, 1);
        this.criteriaModelList[i].operationType.splice(count, 1);
        break;
      }
      this.ilc.updateILCDevices(this.devices);
    }
  }

  saveCriteriatCalculation(k) {
    const file = new Blob([this.criteriaModelList[k].setFinalCalulation(this.criteriaList, k, this.devices)],
      {type: 'json'});
    FileSaver.saveAs(file, this.clusterList[k].device_criteria_file + '.json');
  }

  OnRefreshButton(k) {


    this.criteriaModelList[k].getTestFromformula();
    this.criteriaModelList[k].updateDevceList(this.devices);
    this.ilc.updateILCDevices(this.devices);
    this.criteriaModelList[k].stageName = this.stageName;
    this.criteriaModelList[k].campus = this.campus;
    this.criteriaModelList[k].building = this.building;
    this.criteriaModelList[k].setFinalCalulation(this.criteriaList, k, this.devices);
  }

  ngOnInit() {
    this.criteriaModelList = this.mainModel.criteriaModelList;
    this.criteriaList = this.mainModel.paireiseCriteriaList;
    this.clusterList = this.ilc.clusterList;
    for (let i = 0; i < this.clusterList.length; i++) {
      // tslint:disable-next-line:prefer-for-of
      for (let j = 0; j < this.ilc.deviceAndPoint.length; j++) {
        const temp: {
          deviceName: string,
          devicePoints: string[],
          checked: boolean
        } = {
          deviceName: this.ilc.deviceAndPoint[j].deviceName,
          devicePoints: this.ilc.deviceAndPoint[j].devicePoints,
          checked: this.ilc.deviceAndPoint[j].checked
        };

        if (this.deviceAndPoints[i] === undefined) {
          this.deviceAndPoints[i] = [];
        }

        this.deviceAndPoints[i].push(temp);
      }
    }

    this.showCriteriaConfiguartion = this.clusterList.length !== 0;
    this.campus = this.ilc.campus;
    this.building = this.ilc.building;
    this.stageName = this.criteria.stageName;
    this.devices = this.ilc.devices;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.criteriaModelList.length; i++) {
      this.criteriaModelList[i].campus = this.campus;
      this.criteriaModelList[i].building = this.building;
      for (let subCriteria = 0; subCriteria < this.ilc.deviceAndPoint.length; subCriteria++) {
        if (this.criteriaModelList[i].formulaModel[subCriteria] === undefined) {
          this.criteriaModelList[i].formulaModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].augmentFormulaModel[subCriteria] === undefined) {
          this.criteriaModelList[i].augmentFormulaModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].statusModel[subCriteria] === undefined) {
          this.criteriaModelList[i].statusModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].augmentStatusModel[subCriteria] === undefined) {
          this.criteriaModelList[i].augmentStatusModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].historyModel[subCriteria] === undefined) {
          this.criteriaModelList[i].historyModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].augmentHistoryModel[subCriteria] === undefined) {
          this.criteriaModelList[i].augmentHistoryModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].mapperModel[subCriteria] === undefined) {
          this.criteriaModelList[i].mapperModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].augmentMapperModel[subCriteria] === undefined) {
          this.criteriaModelList[i].augmentMapperModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].constantModel[subCriteria] === undefined) {
          this.criteriaModelList[i].constantModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].augmentConstantModel[subCriteria] === undefined) {
          this.criteriaModelList[i].augmentConstantModel[subCriteria] = [];
        }
      }
    }
  }

  trackByIndex(index: number): any {
    return index;
  }
}
