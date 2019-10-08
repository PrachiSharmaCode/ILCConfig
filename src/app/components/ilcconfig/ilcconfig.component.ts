import {Component, Input, OnInit} from '@angular/core';
import {ILCCongig} from '../../model/ILCConfig.model';
import * as FileSaver from 'file-saver';
import {MainModel} from '../../model/main.model';

@Component({
  selector: 'app-ilcconfig',
  templateUrl: './ilcconfig.component.html',
  styleUrls: ['./ilcconfig.component.css']
})

export class ILCConfigComponent implements OnInit {

  @Input() ilc: ILCCongig;
  @Input() mainModel: MainModel;
  campus: string;
  building: string;
  agentId: string;
  demandLimit: string;
  curtailmentTime: number;
  curtailmentConfirm: number;
  curtailmentBreak: number;
  buildingPowerWindow: number;
  staggerRelease: boolean;
  staggerOfftime: boolean;
  device: string;
  point: string;
  points: string[] = [];
  demandFormula: string;
  demandformulaAgrsArr = [];
  finalCalculation: string;
  showAdvanceOption = false;

  devicesMasterList: {
    deviceTopic: string,
    devicePoints: {
      referenceName: string,
      volttronPointName: string,
    }[]
  }[] = [];

  testpaiewiese: string[];
  arrlen: number;

  check: {
    deviceTopic: string,
    devicePoints: {
      referenceName: string,
      volttronPointName: string,
    }[]
  }[];

  constructor() {
  }


  updatePoints() {
    for (let i = 0; i < this.ilc.deviceAndPoint.length; i++) {
      if (this.ilc.deviceAndPoint[i].deviceName === this.device) {
        this.points = this.ilc.deviceAndPoint[i].devicePoints;
      }
    }
  }


  advanceOption() {
    this.ilc.showAdvanceOption = true;
  }

  closeAdvenceOption() {
    this.ilc.showAdvanceOption = false;
  }

  addDemandFormula() {
    this.demandformulaAgrsArr.push('');
  }

  saveCalculation() {
    const file = new Blob([this.ilc.finalCalcualtion], {type: 'json'});
    FileSaver.saveAs(file, 'test.json');
  }


  onRefeshClick() {
    if (this.staggerOfftime === undefined) {
      this.staggerOfftime = false;
    }
    if (this.staggerRelease === undefined) {
      this.staggerRelease = false;
    }
    this.ilc.setILCConfig(this.campus, this.building, this.device, this.point, this.demandFormula,
      this.demandformulaAgrsArr, this.agentId, this.demandLimit, this.curtailmentTime,
      this.curtailmentConfirm, this.curtailmentBreak, this.buildingPowerWindow,
      this.staggerRelease, this.staggerOfftime);
    this.finalCalculation = this.ilc.finalCalcualtion;
  }

  ngOnInit() {

    // localStorage.setItem('curl_time', JSON.stringify(this.curtailmentTime));
    // localStorage.setItem('curl_confrim', JSON.stringify(this.curtailmentConfirm));
    // localStorage.setItem('curl_break', JSON.stringify(this.curtailmentBreak));
    // localStorage.setItem('avgBuildingPower', JSON.stringify(this.buildingPowerWindow));
    //
    // localStorage.setItem('stage_release', JSON.stringify(this.staggerRelease));
    // localStorage.setItem('stage_off', JSON.stringify(this.staggerOfftime));

    if (localStorage.getItem('obj') !== null) {
      const obj = JSON.parse(localStorage.getItem('obj'));
      console.log(obj);


      if (obj.agent_id != null || obj.agent_id !== undefined) {
        this.agentId = obj.agent_id;
      } else {
        this.agentId = this.ilc.agentId;
      }

      if (obj.demand_limit != null || obj.demand_limit !== undefined) {
        this.demandLimit = obj.demand_limit;
      } else {
        this.demandLimit = this.ilc.demandLimit;
      }

      if (obj.curtailment_break != null || obj.curtailment_break !== undefined) {
        this.curtailmentBreak = obj.curtailment_break;
      } else {
        this.curtailmentBreak = this.ilc.curtailmentBreak;
      }

      if (obj.curtailment_confirm != null || obj.curtailment_confirm !== undefined) {
        this.curtailmentConfirm = obj.curtailment_confirm;
      } else {
        this.curtailmentConfirm = this.ilc.curtailmentConfirm;
      }

      if (obj.curtailment_time != null || obj.curtailment_time !== undefined) {
        this.curtailmentTime = obj.curtailment_time;
      } else {
        this.curtailmentTime = this.ilc.curtailmentTime;
      }

      if (obj.average_building_power_window != null || obj.average_building_power_window !== undefined) {
        this.buildingPowerWindow = obj.average_building_power_window;
      } else {
        this.buildingPowerWindow = this.ilc.buildingPowerWindow;
      }

    }


    this.check = this.ilc.devicesMasterList;
    this.campus = this.ilc.campus;
    this.building = this.ilc.building;
    this.point = this.ilc.point;
    this.demandFormula = this.ilc.demandFormula;
    this.demandformulaAgrsArr = this.ilc.demandFormulaArgs;
    this.testpaiewiese = this.ilc.pairwiseCriteriaList;
    this.arrlen = this.testpaiewiese.length;
    this.finalCalculation = this.ilc.finalCalcualtion;
    this.devicesMasterList = this.ilc.devicesMasterList;
  }

  trackByIndex(index: number): any {
    return index;
  }
}
