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
    this.campus = this.ilc.campus;
    this.building =  this.ilc.building;
    console.log(this.campus);
    console.log(this.building);
    this.curtailmentList = this.ilc.curtailmentList;
    if (this.curtailmentList.length !== this.devices.length) {
      for (const device of this.devices) {
        this.curtailmentList.push({
          firstStageCooling: {
            deviceTopic: this.campus + '/' + this.building + '/' + device,
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
    }
  }

  trackByIndex(index: number): any {
    return index;
  }

}
