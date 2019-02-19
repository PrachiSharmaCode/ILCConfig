import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  numberOfCluster = 1;

  increaseCluster() {
    this.numberOfCluster++;
    console.log(this.numberOfCluster + "servcie");
    return this.numberOfCluster;
  }

  constructor() { }
}
