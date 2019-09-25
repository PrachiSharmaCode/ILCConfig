import {Component, Input, OnInit} from '@angular/core';
import {ILCCongig} from '../../model/ILCConfig.model';
import {MainModel} from '../../model/main.model';
import {PairwiseModel} from '../../model/pairwise.model';
import {CurtailmentModel} from '../../model/curtailment.model';
import {CriteriaModel} from '../../model/criteria.model';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {

  @Input() ilc: ILCCongig;
  @Input() mainModel: MainModel;

  clusterList: {
    cluster_name: string;
    device_criteria_file: string;
    device_control_file: string;
    pairwise_criteria_file: string;
    cluster_priority: string
  }[];
  getCluster = false;
  clusterName: string;
  clusterType = '';

  constructor() {
  }

  newCluster() {
    this.getCluster = true;
  }

  addCluster() {
    this.clusterList.push({
      cluster_name: this.clusterName,
      cluster_priority: '',
      pairwise_criteria_file: '',
      device_criteria_file: '',
      device_control_file: ''
    });
    this.ilc.updateClusterList(this.clusterList);
    this.mainModel.addPairwise(new PairwiseModel());
    this.mainModel.addCurtailment(new CurtailmentModel());
    this.mainModel.addCriteria(new CriteriaModel());
    this.mainModel.addpairwiseCrteriaList(['zonetemperature-setpoint', 'stage',
      'history-zonetemperature', 'rated-power', 'room-type']);
    this.getCluster = false;
    this.clusterName = '';
  }

  removeCluster(index) {
    this.clusterList.splice(index, 1);
    this.ilc.updateClusterList(this.clusterList);
  }

  ngOnInit() {
    this.clusterList = this.ilc.clusterList;
  }

  trackByIndex(index: number): any {
    return index;
  }
}
