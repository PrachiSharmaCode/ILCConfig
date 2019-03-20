import {Component, Input, OnInit} from '@angular/core';
import { ILCCongig} from '../../model/ILCConfig.model';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {

  @Input() ilc: ILCCongig;

  clusterList: { _deviceCriteriaFile: string;
                 _deviceCurtailmentFile: string;
                 _pairwiseCriteriaFile: string;
                 _clusterPriority: string }[];

  constructor() {}

  addCluster() {
    this.clusterList.push({_clusterPriority: '',
                           _pairwiseCriteriaFile: '',
                           _deviceCriteriaFile: '',
                           _deviceCurtailmentFile: ''});
    this.clusterList = this.ilc.clusterList;
  }

  ngOnInit() {
    this.clusterList = this.ilc.clusterList;
  }

  trackByIndex(index: number): any {
    return index;
  }
}
