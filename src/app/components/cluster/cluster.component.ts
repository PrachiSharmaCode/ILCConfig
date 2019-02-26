import { Component, OnInit } from '@angular/core';
import { ClusterService} from '../../services/cluster/cluster.service';
import { Cluster} from '../../model/cluster.model';
import {element} from "protractor";

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {

  cluster: Cluster[] = [];

  constructor(private clusterService: ClusterService) { }

  addCluster() {
    this.cluster.push(new Cluster('', '', '', ''));
    this.clusterService.addNewCluster(this.cluster);
  }

  ngOnInit() {
    this.cluster = this.clusterService.getClusterArray();
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
