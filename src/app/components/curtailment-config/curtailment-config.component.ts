import {Component, Input, OnInit} from '@angular/core';
import {ILCCongig} from '../../model/ILCConfig.model';
import * as FileSaver from 'file-saver';
import {CurtailmentModel} from '../../model/curtailment.model';
import {MainModel} from '../../model/main.model';

@Component({
  selector: 'app-curtailment-config',
  templateUrl: './curtailment-config.component.html',
  styleUrls: ['./curtailment-config.component.css']
})
export class CurtailmentConfigComponent implements OnInit {

  @Input() ilc: ILCCongig;
  @Input() curtailment: CurtailmentModel;
  @Input() mainModel: MainModel;

  curtailmentModelList: CurtailmentModel[] = [];

  clusterList: {
    cluster_name: string;
    device_criteria_file: string;
    device_curtailment_file: string;
    pairwise_criteria_file: string;
    cluster_priority: string
  }[];

  deviceAndPoints: {
    deviceName: string,
    devicePoints: string[],
    checked: boolean
  }[] = [];


  criteriaList: string[];
  devices: {
    deviceName: string,
    devicePoints: string[]
  }[];

  campus: string;
  building: string;
  finalCalculation: string;

  curtailmentList: {
    firstStageCooling: {
      deviceTopic: string,
      deviceStatus: {
        condition: string,
        deviceStageArgs: string
      }
    },
    curtailmentSetting: {
      point: string,
      curtailmentMethod: string,
      // @ts-ignore
      [this.curtailmentList.curtailmentSetting.curtailmentMethod]: string;
    }
  }[] = [];

  constructor() {
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


      console.log(this.devices);


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

    }
  }

  onRefreshButton(i) {
    // this.curtailmentModelList[i].updateCurtailmentList(this.curtailmentList);
    this.curtailmentModelList[i].updateDevices(this.devices);
    this.finalCalculation = this.curtailmentModelList[i].setFinalCalulation();
    console.log(this.finalCalculation);
  }

  saveCurtailmentCalculation(i) {
    const file = new Blob([this.curtailmentModelList[i].curtailmentCalculation],
      {type: 'json'});
    FileSaver.saveAs(file, this.clusterList[i].device_curtailment_file);
  }

  ngOnInit() {
    this.clusterList = this.ilc.clusterList;
    this.curtailmentModelList = this.mainModel.curtailmentList;
    this.criteriaList = this.ilc.pairwiseCriteriaList;
    this.deviceAndPoints = this.ilc.deviceAndPoint;
    this.devices = this.ilc.devices;
    console.log(this.devices);
    this.campus = this.ilc.campus;
    this.building = this.ilc.building;
    for (let j = 0; j < this.curtailmentModelList.length; j++) {
      // this.devices = this.curtailmentModelList[j].devices;
      if (this.curtailmentModelList[j].curtailmentList === undefined) {
        this.curtailmentModelList[j].curtailmentList = [];
      }
      for (let i = 0; i < this.devices.length; i++) {
        if (this.curtailmentModelList[j].curtailmentList[i] === undefined) {
          this.curtailmentModelList[j].curtailmentList[i] = [];
          this.curtailmentModelList[j].curtailmentList[i] = {
            firstStageCooling: {
              deviceTopic: this.campus + '/' + this.building + '/' + this.devices[i].deviceName,
              deviceStatus: {
                condition: '',
                deviceStageArgs: ''
              }
            },
            curtailmentSetting: {
              point: '',
              curtailmentMethod: '',
            }
          };
        }
      }
    }
    console.log(this.curtailmentModelList);
  }

  trackByIndex(index: number): any {
    return index;
  }

}
