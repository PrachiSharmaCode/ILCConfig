import {Component, Input, OnInit} from '@angular/core';
import * as FileSaver from 'file-saver';
import {PairwiseModel} from '../../model/pairwise.model';


@Component({
  selector: 'app-pairwise',
  templateUrl: './pairwise.component.html',
  styleUrls: ['./pairwise.component.css']
})

export class PairwiseComponent implements OnInit {
  pairwise: PairwiseModel = new PairwiseModel();
  pairwiseCriteriaList: string[] = [];
  calculation = '';
  finalCalcultion: string;
  criteria = new  Map<any, any>();
  generate = false;

  constructor() { }

  remainingList(num: number): string[] {
    const criteriaList: string[] = [];
    for (let i = num + 1; i < this.pairwiseCriteriaList.length ; i++ ) {
      criteriaList.push(this.pairwiseCriteriaList[i]);
    }
    return criteriaList;
  }
  // 877-943-3530
  generateCamparisons() {
    this.generate = true;
  }

  updateValues(changeEvent, followCriteria, mainCriteria) {
    let criteraMap: Map<string, Map<string, string>>;
    criteraMap = this.criteria.get(mainCriteria);
    criteraMap.set(followCriteria, changeEvent.value);
    this.criteria.set(mainCriteria, criteraMap);
  }

  savePairwiseCalculation() {
    const file = new Blob([this.pairwise.pairwiaseCalculation],
      {type: 'json'});
    FileSaver.saveAs(file, 'pairwise.json');
  }

  onRefreshButton() {
    this.pairwise.pairwiseCriteria = this.criteria;
    this.finalCalcultion = this.pairwise.pairwiaseCalculation;
    console.log('isnde');
    console.log(this.finalCalcultion);
  }

  ngOnInit() {
    this.pairwiseCriteriaList = this.pairwise.pairwiseCriteriaList;
    let num = 0;
    while (num < this.pairwiseCriteriaList.length) {
      const hmap =  new Map();
      for (let i = num + 1; i < this.pairwiseCriteriaList.length ; i++ ) {
        hmap.set(this.pairwiseCriteriaList[i], 5);
      }
      this.criteria.set(this.pairwiseCriteriaList[num], hmap);
      num++;
    }
    this.finalCalcultion = this.pairwise.pairwiaseCalculation;
  }

  trackByIndex(index: number): any {
    return index;
  }
}
