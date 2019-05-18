import {Component, Input, OnInit} from '@angular/core';
import {ILCCongig} from '../../model/ILCConfig.model';
import * as FileSaver from 'file-saver';
import {MainModel} from "../../model/main.model";

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
  curtailmentTime: string;
  curtailmentConfirm: string;
  curtailmentBreak: string;
  buildingPowerWindow: string;
  staggerRelease: string;
  staggerOfftime: string;
  device: string;
  point: string;
  demandFormula: string;
  demandformulaAgrsArr = [];
  finalCalculation: string;
  showAdvanceOption: boolean = false;

  testpaiewiese: string[];
  arrlen: number;

  constructor() {
  }

  advanceOption() {
    this.showAdvanceOption = true;
  }

  closeAdvenceOption() {
    this.showAdvanceOption = false;
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
      this.staggerOfftime = 'false';
    }
    if (this.staggerRelease === undefined) {
      this.staggerRelease = 'false';
    }
    this.ilc.setILCConfig(this.campus, this.building, this.device, this.point, this.demandFormula,
      this.demandformulaAgrsArr, this.agentId, this.demandLimit, this.curtailmentTime,
      this.curtailmentConfirm, this.curtailmentBreak, this.buildingPowerWindow,
      this.staggerRelease, this.staggerOfftime);
    this.finalCalculation = this.ilc.finalCalcualtion;
  }

  ngOnInit() {
    this.campus = this.ilc.campus;
    this.building = this.ilc.building;
    this.device = this.ilc.device;
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
  }

  trackByIndex(index: number): any {
    return index;
  }
}
