import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  numberOfCluster = 0;

  increaseCluster() {
    this.numberOfCluster = this.numberOfCluster + 1;
    return this.numberOfCluster;
  }

  constructor() { }
}
