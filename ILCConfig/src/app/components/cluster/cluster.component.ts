import { Component, OnInit } from '@angular/core';
import { ClusterService} from "../../services/cluster/cluster.service";

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {

  clusterNumber: number;

  constructor(private clusterService: ClusterService) { }

  ngOnInit() {
    this.clusterNumber = this.clusterService.increaseCluster();
    console.log(this.clusterNumber);
  }

}
