import { Cluster} from './cluster.model';

export class ILCCongig {
  campus: string;
  building: string;
  device: string;
  point: string;
  demandFormula: string;
  demandFormulaArgs: string;
  agentId: string;
  demandLimit: string;
  curtailmentTime: string;
  curtailmentConfirm: string;
  curtailmentBreak: string;
  buildingPowerWindow: string;
  staggerRelease: string;
  staggerOfftime: string;
  cluster: Cluster[];

  constructor(campus, building, device, point, demandFormula, demandFormulaArgs, agentId, demandLimit,
              curtailmentTime, curtailmentConfim, curtailmentBreak, buildingPowerWindow, staggerRelease,
              staggerOfftime, cluster) {

    this.campus = campus;
    this.building = building;
    this.device = device;
    this.point = point;
    this.demandFormula = demandFormula;
    this.demandFormulaArgs= demandFormulaArgs;
    this.agentId = agentId;
    this.demandLimit = demandLimit;
    this.curtailmentTime = curtailmentTime;
    this.curtailmentConfirm = curtailmentConfim;
    this.curtailmentBreak = curtailmentBreak;
    this.buildingPowerWindow = buildingPowerWindow;
    this.staggerRelease = staggerRelease;
    this.staggerOfftime = staggerOfftime
    this.cluster = cluster;
  }
}
