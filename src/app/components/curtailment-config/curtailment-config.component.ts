import {Component, Input, OnInit} from '@angular/core';
import {ILCCongig} from '../../model/ILCConfig.model';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-curtailment-config',
  templateUrl: './curtailment-config.component.html',
  styleUrls: ['./curtailment-config.component.css']
})
export class CurtailmentConfigComponent implements OnInit {

  @Input() ilc: ILCCongig;

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
      offset: string,
      value: string,
      load: string
    }
  }[];

  constructor() { }

  checkList() {
    console.log(this.curtailmentList);
  }

  onRefreshButton() {
    this.ilc.curtailmentList = this.curtailmentList;
    this.finalCalculation = this.ilc.curtailmentCalculation;
    console.log(this.finalCalculation);
    this.ilc.print();
  }

  saveCurtailmentCalculation() {
    const file = new Blob([this.ilc.curtailmentCalculation],
      {type: 'json'});
    FileSaver.saveAs(file, 'curtailment.json');
  }

  ngOnInit() {
    this.criteriaList = this.ilc.pairwiseCriteriaList;
    this.devices = this.ilc.devices;
    console.log(this.devices);
    this.campus = this.ilc.campus;
    this.building = this.ilc.building;
    this.curtailmentList = this.ilc.curtailmentList;
    for (let i = 0; i < this.devices.length; i++) {
      this.curtailmentList.push({
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
              offset: '',
              value: '',
              load: ''
            }
      });
    }
    this.curtailmentList = this.ilc.curtailmentList;
  }

  trackByIndex(index: number): any {
    return index;
  }

}
