import { Injectable } from '@angular/core';
import { Cluster} from '../../model/cluster.model';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  finalClusterCalculation = '';
  firstCluster = new Cluster('', '', '', '');
  cluster: Cluster[] = [this.firstCluster];

  addNewCluster(cluster: Cluster[]) {
    this.cluster = cluster;
    this.finalClusterCalculation = '';
  }

  getClusterCalculation() {
    for (let i = 0; i < this.cluster.length; i++) {
      this.finalClusterCalculation = this.finalClusterCalculation + '\t\t{\n'
      + '\t\t\"device_curtailment_file\"\:\"' + this.cluster[i].deviceCurtailmentFile + '\n'
      + '\t\t\"device_criteria_file\"\:\"' + this.cluster[i].deviceCriteriaFile + '\n'
      + '\t\t\"pairwise_criteria_file\"\:\"' + this.cluster[i].pairwiseCriteriaFile + '\n'
      + '\t\t\"cluster_priority\"\:' + this.cluster[i].clusterPriority + '\n' + '\t\t}' + '\n';
    }
    return this.finalClusterCalculation;
  }

  printCluster() {
    return this.cluster;
  }

  getClusterArray() {
    return this.cluster;
  }

}
