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

  operationVal: string[][] = [];


  clusterList: {
    cluster_name: string;
    device_criteria_file: string;
    device_curtailment_file: string;
    pairwise_criteria_file: string;
    cluster_priority: string
  }[];

  devices: {
    deviceName: string,
    devicePoints: string[]
  }[];


  deviceAndPoints: {
    deviceName: string,
    devicePoints: string[],
    checked: boolean
  }[] = [];

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

    console.log(k);
    if (val === 'Formula') {
      console.log('index' + index);
      console.log('i' + i);
      console.log('val' + val);
      if (this.criteriaModelList[k].formulaModel[index][i] === undefined) {
        this.criteriaModelList[k].formulaModel[index][i] = new FormulaCriteriaModel();
      }
      this.criteriaModelList[k].formulaModel[index][i] = new FormulaCriteriaModel();
      this.criteriaModelList[k].formulaModel[index][i].argument.push('');

      console.log(this.criteriaModelList[k].formulaModel[0][0]);
      console.log(this.criteriaModelList);
      console.log(this.criteriaModelList[k].formulaModel);
    } else {
      this.criteriaModelList[k].formulaModel[index][i] = null;
    }

    console.log(this.criteriaModelList[k].formulaModel[index][i]);

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
      if (this.criteriaModelList[k].historyModel === undefined) {
        this.criteriaModelList[k].historyModel = [];
      }
      this.criteriaModelList[k].historyModel[index][i] = null;
    }
  }

  addOrRemove(id, e, d, k) {

    console.log(id, k, d, e);
    console.log(this.deviceAndPoints);

    if (e.target.checked) {

      this.deviceAndPoints[d].checked = true;

      const temp: {
        deviceName: string,
        devicePoints: string[],
      } = {
        deviceName: this.deviceAndPoints[d].deviceName,
        devicePoints: this.deviceAndPoints[d].devicePoints,
      };

      if (this.devices === undefined) {
        this.devices = [];
      }
      this.devices.push(temp);

      this.ilc.updateILCDevices(this.devices)
      this.ilc.updateDeviceAndPoints(this.deviceAndPoints);

      console.log(this.devices);


      for (let i = 0; i < this.criteriaModelList.length; i++) {
        if (this.criteriaModelList[i].operationType === undefined) {
          this.criteriaModelList[i].operationType = [];
        }
        this.criteriaModelList[i].operationType.push(['', '', '', '', '']);
      }
      console.log(this.criteriaModelList);
    } else {
      this.deviceAndPoints[d].checked = false;
      let count = 0;

      for (let j = 0; j < this.devices.length; j++) {
        if (this.devices[j].deviceName === id) {
          this.devices.splice(j, 1);
          count = j;
          break;
        }
      }
      for (let i = 0; i < this.criteriaModelList.length; i++) {
        this.criteriaModelList[i].formulaModel.splice(count, 1);
        this.criteriaModelList[i].statusModel.splice(count, 1);
        this.criteriaModelList[i].historyModel.splice(count, 1);
        this.criteriaModelList[i].mapperModel.splice(count, 1);
        this.criteriaModelList[i].constantModel.splice(count, 1);
        this.criteriaModelList[i].operationType.splice(count, 1);
        break;
      }
      this.ilc.updateILCDevices(this.devices)
      this.ilc.updateDeviceAndPoints(this.deviceAndPoints);
      console.log(this.criteriaModelList);
    }
  }

  OnRefreshButton(k) {
    this.criteriaModelList[k].updateDevceList(this.devices);
    this.ilc.updateILCDevices(this.devices)
    this.criteriaModelList[k].stageName = this.stageName;
    console.log(this.criteriaModelList[k].setFinalCalulation(this.criteriaList, k));
  }


  ngOnInit() {

    this.criteriaModelList = this.mainModel.criteriaModelList;
    this.criteriaList = this.mainModel.paireiseCriteriaList;
    this.clusterList = this.ilc.clusterList;
    this.deviceAndPoints = this.ilc.deviceAndPoint;
    this.showCriteriaConfiguartion = this.clusterList.length !== 0;
    this.campus = this.ilc.campus;
    this.building = this.ilc.building;
    this.stageName = this.criteria.stageName;
    this.devices = this.ilc.devices;
    for (let i = 0; i < this.criteriaModelList.length; i++) {
      for (let subCriteria = 0; subCriteria < 3; subCriteria++) {
        if (this.criteriaModelList[i].formulaModel[subCriteria] === undefined) {
          this.criteriaModelList[i].formulaModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].statusModel[subCriteria] === undefined) {
          this.criteriaModelList[i].statusModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].historyModel[subCriteria] === undefined) {
          this.criteriaModelList[i].historyModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].mapperModel[subCriteria] === undefined) {
          this.criteriaModelList[i].mapperModel[subCriteria] = [];
        }
        if (this.criteriaModelList[i].constantModel[subCriteria] === undefined) {
          this.criteriaModelList[i].constantModel[subCriteria] = [];
        }
      }
    }

    // this.criteriaModelList[0].operationType = [];
    // this.criteriaModelList[1].operationType = [];
    //
    // this.criteriaModelList[0].operationType.push(['', '', '', '', '']);
    // this.criteriaModelList[0].operationType.push(['', '', '', '', '']);
    // this.criteriaModelList[0].operationType.push(['', '', '', '', '']);
    // this.criteriaModelList[1].operationType.push(['', '', '', '', '']);
    // this.criteriaModelList[1].operationType.push(['', '', '', '', '']);
    // this.criteriaModelList[1].operationType.push(['', '', '', '', '']);
  }


  trackByIndex(index: number): any {
    return index;
  }
}
