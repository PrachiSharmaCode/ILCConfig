export class Cluster {

  clusterPriority: string;
  pairwiseCriteriaFile: string;
  deviceCriteriaFile: string;
  deviceCurtailmentFile: string;

  constructor(clusterPriority, pairwiseCriteriaFile, deviceCriteriaFile, deviceCurtailmentFile){

    this.clusterPriority = clusterPriority;
    this.pairwiseCriteriaFile = pairwiseCriteriaFile;
    this.deviceCriteriaFile = deviceCriteriaFile;
    this.deviceCurtailmentFile = deviceCurtailmentFile;
  }
}
