import { Component, OnInit, } from '@angular/core';
import { ILCCongig} from '../../model/ILCConfig.model';
import { Cluster} from '../../model/cluster.model';
import {FormsModule} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import { ajax, css } from 'jquery';
import {stringify} from 'querystring';
import { ILCconfigService} from '../../services/ILCConfigService/ilcconfig.service';


@Component({
  selector: 'app-ilcconfig',
  templateUrl: './ilcconfig.component.html',
  styleUrls: ['./ilcconfig.component.css']
})
export class ILCConfigComponent implements OnInit {

  ilc: ILCCongig;
  cluster: Cluster;

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
  demandformulaAgrs: string;
  demandformulaAgrsArr = [];

  // Cluster Attributes
  noOfCluster = [1];

  clusterPriority: string;
  pairWiseCriteria: string;
  deviceCriteriaFile: string;
  deviceCurtailmentFile: string;

  finalCalculation: string;
  clusterArr: Cluster[] = [];

constructor(private ilcService: ILCconfigService) { }

  addDemandFormula() {
    $('#powerMeter').append('<label>Demand Formula Arguments (Optional)</label>' +
      '<input style="width: 50%" type="text" class="form-control" [(ngModel)]="demandformulaAgrs"><br/>');
    // @ts-ignore
    this.demandformulaAgrsArr.push(this.demandformulaAgrs);
    console.log(this.demandformulaAgrsArr);
  }

  addCluster() {
  let newCluster = (this.noOfCluster[this.noOfCluster.length - 1]) + 1;
  this.noOfCluster.push(newCluster);
  }

  onRefeshClick() {

    if (this.staggerOfftime === undefined) {
       this.staggerOfftime = 'false';
    }

    if (this.staggerRelease === undefined) {
       this.staggerRelease = 'false';
    }

    this.ilc = new ILCCongig(this.campus, this.building, this.device, this.point, this.demandFormula,
                             this.demandformulaAgrs, this.agentId, this.demandLimit, this.curtailmentTime,
                             this.curtailmentConfirm, this.curtailmentBreak, this.buildingPowerWindow,
                             this.staggerRelease, this.staggerOfftime, this.clusterArr);
    this.ilcService.createIlcConfig(this.ilc);
    this.finalCalculation = this.ilcService.getFinalCalculation();
  }
  thisFileUpload() {
    document.getElementById('file').click();
  }

ngOnInit() {
  this.ilc = this.ilcService.getIlcConfig();
  this.campus = this.ilc.campus;
  this.building = this.ilc.building;
  this.device = this.ilc.device;
  this.point = this.ilc.point;
  this.demandFormula = this.ilc.demandFormula
  this.demandformulaAgrs = this.ilc.demandFormulaArgs;
  this.agentId = this.ilc.agentId;
  this.demandLimit = this.ilc.demandLimit;
  this.curtailmentTime = this.ilc.curtailmentTime
  this.curtailmentConfirm = this.ilc.curtailmentConfirm;
  this.curtailmentBreak = this.ilc.curtailmentBreak;
  this.buildingPowerWindow = this.ilc.buildingPowerWindow;
  this.clusterArr = this.ilc.cluster;

  this.finalCalculation = this.ilcService.getFinalCalculation();
}

}
