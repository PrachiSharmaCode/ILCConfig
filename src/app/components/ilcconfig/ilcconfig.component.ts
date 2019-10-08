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
    this.check = this.ilc.devicesMasterList;
    this.campus = this.ilc.campus;
    this.building = this.ilc.building;
    this.point = this.ilc.point;
    this.demandFormula = this.ilc.demandFormula;
    this.demandformulaAgrsArr = this.ilc.demandFormulaArgs;
    this.agentId = this.ilc.agentId;
    this.demandLimit = this.ilc.demandLimit;
    this.curtailmentTime = this.ilc.curtailmentTime;
    this.curtailmentConfirm = this.ilc.curtailmentConfirm;
    this.curtailmentBreak = this.ilc.curtailmentBreak;
    this.buildingPowerWindow = this.ilc.buildingPowerWindow;
    this.testpaiewiese = this.ilc.pairwiseCriteriaList;
    this.arrlen = this.testpaiewiese.length;
    this.finalCalculation = this.ilc.finalCalcualtion;
    this.devicesMasterList = this.ilc.devicesMasterList;
  }

  trackByIndex(index: number): any {
    return index;
  }
}
