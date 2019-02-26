import { Injectable } from '@angular/core';
import { ILCCongig} from '../../model/ILCConfig.model';
import { ClusterService} from '../cluster/cluster.service';

@Injectable({
  providedIn: 'root'
})

export class ILCconfigService {

  finalCalculation = '';
  clusterCalculation = '';

  ilcConfig = new ILCCongig( '', '', '', '', '', [''],
    '', '', '', '', '', '',
    '', '', null);

  constructor(private clusterService: ClusterService) {}

  createIlcConfig(ilc: ILCCongig) {
    this.ilcConfig.campus = ilc.campus;
    this.ilcConfig.building = ilc.building;
    this.ilcConfig.device = ilc.device;
    this.ilcConfig.point = ilc.point;
    this.ilcConfig.demandFormula = ilc.demandFormula;
    this.ilcConfig.demandFormulaArgs = ilc.demandFormulaArgs;
    this.ilcConfig.agentId = ilc.agentId;
    this.ilcConfig.demandLimit = ilc.demandLimit;
    this.ilcConfig.curtailmentTime = ilc.curtailmentTime;
    this.ilcConfig.curtailmentConfirm = ilc.curtailmentConfirm;
    this.ilcConfig.curtailmentBreak = ilc.curtailmentBreak;
    this.ilcConfig.buildingPowerWindow = ilc.buildingPowerWindow;
    this.ilcConfig.staggerRelease = ilc.staggerRelease;
    this.ilcConfig.staggerOfftime = ilc.staggerOfftime;
    this.ilcConfig.cluster = ilc.cluster;
    this.clusterCalculation = this.clusterService.getClusterCalculation();

    this.finalCalculation =
      '{\n' +
      '\t\"campus\":' + this.ilcConfig.campus + ',' + '\n' +
      '\t\"building\":' + this.ilcConfig.building + ',' + '\n' +
      '\t\"power_meter\":{\n' +
      '\t\t\t\"device\":' + this.ilcConfig.device + '\n' +
      '\t\t\t\"point\":' + this.ilcConfig.point + '\n ' +
      '\t\t\t\t\"demand_formula\":{\n' +
      '\t\t\t\t\"operation\":Abs[' + this.ilcConfig.demandFormula + ']\n' +
      '\t\t\t\t\"operation_args\":[' + this.ilcConfig.demandFormulaArgs + ']\n ' +
      '\t\t\t\t}\n' +
      '\t}\,\n' +
      '\t\"agent_id\":' + this.ilcConfig.agentId + ',' + '\n' +
      '\t\"demand_limit\":' + this.ilcConfig.demandLimit + ',' + '\n' +
      '\t\"curtailment_time\":' + this.ilcConfig.curtailmentTime + ',' + '\n' +
      '\t\"curtailment_confirm\":' + this.ilcConfig.curtailmentConfirm + ',' + '\n' +
      '\t\"curtailment_break\":' + this.ilcConfig.curtailmentBreak + ',' + '\n' +
      '\t\"average_building_power_window\":' + this.ilcConfig.building + ',' + '\n' +
      '\t\"stagger_release\":' + this.ilcConfig.staggerRelease + ',' + '\n' +
      '\t\"stagger_off_time\":' + this.ilcConfig.staggerOfftime + ',' + '\n' +
      '\t\"cluster\":[ ' + '\n' +
      this.clusterCalculation + '\n]' + '\t';
  }

  getFinalCalculation() {
    return this.finalCalculation;
  }

  getIlcConfig() {
    return this.ilcConfig;
  }

  printILC() {
    console.log(this.ilcConfig);
  }

}
