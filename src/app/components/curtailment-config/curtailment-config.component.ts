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


  criteriaList: string[];
  devices: string[];
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

  onRefreshButton(i) {
    // this.curtailmentModelList[i].updateCurtailmentList(this.curtailmentList);
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
    this.devices = this.ilc.devices;
    this.campus = this.ilc.campus;
    this.building = this.ilc.building;
    for (let j = 0; j < this.curtailmentModelList.length; j++) {
      if (this.curtailmentModelList[j].curtailmentList === undefined) {
        this.curtailmentModelList[j].curtailmentList = [];
      }
      for (let i = 0; i < this.devices.length; i++) {
        if (this.curtailmentModelList[j].curtailmentList[i] === undefined) {
          this.curtailmentModelList[j].curtailmentList[i] = [];
          this.curtailmentModelList[j].curtailmentList[i] = {
            firstStageCooling: {
              deviceTopic: this.campus + '/' + this.building + '/' + this.devices[i],
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
  }

  trackByIndex(index: number): any {
    return index;
  }

}
