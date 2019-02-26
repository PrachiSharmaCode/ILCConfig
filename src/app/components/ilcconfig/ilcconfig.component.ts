import { Component, OnInit, } from '@angular/core';
import { ILCCongig} from '../../model/ILCConfig.model';
import { Cluster} from '../../model/cluster.model';
import { ILCconfigService} from '../../services/ILCConfigService/ilcconfig.service';
import { ClusterService} from '../../services/cluster/cluster.service';

  @Component({
    selector: 'app-ilcconfig',
    templateUrl: './ilcconfig.component.html',
    styleUrls: ['./ilcconfig.component.css']
  })

  export class ILCConfigComponent implements OnInit {

  ilc: ILCCongig;
  cluster: Cluster[];

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
  clusterArr: Cluster[] = [];

  constructor(private ilcService: ILCconfigService, private clusterService: ClusterService) { }

  addDemandFormula() {
    this.demandformulaAgrsArr.push('');
    console.log(this.demandformulaAgrsArr);
  }

  onRefeshClick() {
    this.clusterService.finalClusterCalculation = '';

    if (this.staggerOfftime === undefined) {
      this.staggerOfftime = 'false';
    }
    if (this.staggerRelease === undefined) {
      this.staggerRelease = 'false';
    }

    this.ilc = new ILCCongig(this.campus, this.building, this.device, this.point, this.demandFormula,
                             this.demandformulaAgrsArr, this.agentId, this.demandLimit, this.curtailmentTime,
                             this.curtailmentConfirm, this.curtailmentBreak, this.buildingPowerWindow,
                             this.staggerRelease, this.staggerOfftime, this.clusterArr);
    this.ilcService.createIlcConfig(this.ilc);

    this.finalCalculation = this.ilcService.getFinalCalculation();
  }

  ngOnInit() {
    this.ilc = this.ilcService.getIlcConfig();
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
    this.clusterArr = this.ilc.cluster;

    this.finalCalculation = this.ilcService.getFinalCalculation();
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}
