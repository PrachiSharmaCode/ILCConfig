import {Component, Input, OnInit} from '@angular/core';
import * as FileSaver from 'file-saver';
import {PairwiseModel} from '../../model/pairwise.model';
import {MainModel} from '../../model/main.model';
import {ILCCongig} from '../../model/ILCConfig.model';


@Component({
  selector: 'app-pairwise',
  templateUrl: './pairwise.component.html',
  styleUrls: ['./pairwise.component.css']
})

export class PairwiseComponent implements OnInit {
  @Input() ilc: ILCCongig;
  @Input() pairwise: PairwiseModel;
  @Input() mainModel: MainModel;
  pairwiseList: PairwiseModel[] = [];
  clusterList: { _deviceCriteriaFile: string;
                  _deviceCurtailmentFile: string;
                  _pairwiseCriteriaFile: string;
                  _clusterPriority: string }[];
  pairwiseCriteriaList: string[] = [];
  finalCalcultion: string;
  criteria = new Map<any, any>();
  generate = true;
  showPairwiseList: boolean;
  check  = 'j';

  constructor() { }

  remainingList(num: number): string[] {
    const criteriaList: string[] = [];
    for (let i = num + 1; i < this.pairwiseCriteriaList.length ; i++ ) {
      criteriaList.push(this.pairwiseCriteriaList[i]);
    }
    return criteriaList;
  }

  generateCamparisons() {
    if (this.generate === undefined) {
      let num = 0;
      while (num < this.pairwiseCriteriaList.length) {
        const hmap =  new Map();
        for (let i = num + 1; i < this.pairwiseCriteriaList.length ; i++ ) {
          hmap.set(this.pairwiseCriteriaList[i], 5);
        }
        this.criteria.set(this.pairwiseCriteriaList[num], hmap);
        num++;
      }
    } else {
      this.criteria =  this.pairwise.pairwiseCriteria;
    }
    this.generate =  true;
    this.pairwise.setpairwise(this.pairwiseCriteriaList, this.criteria, this.generate, this.finalCalcultion);
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

  onRefreshButton(i) {
    this.pairwiseList[i].pairwiseCriteria = this.criteria;
    this.pairwiseList[i].pairwiseCriteriaList = this.pairwiseCriteriaList;
    // this.finalCalcultion = this.pairwise.setFinalCalculation();
    // this.pairwise.pairwiaseCalculation =  this.finalCalcultion;
    // console.log(this.pairwise.pairwiaseCalculation);
    // this.pairwise.setpairwise(this.pairwiseCriteriaList, this.criteria, this.generate, this.finalCalcultion);
    this.finalCalcultion =  this.pairwiseList[i].setFinalCalculation();
    this.pairwiseList[i].setpairwise(this.pairwiseCriteriaList, this.criteria, this.generate, this.finalCalcultion);
    console.log(this.pairwiseList[i].pairwiaseCalculation);
   // this.pairwise.print();
  }

  ngOnInit() {
    this.pairwiseList =  this.mainModel.pairwiseList;
    this.clusterList = this.ilc.clusterList;
    console.log(this.clusterList);
    if(this.clusterList.length === 0) {
      this.showPairwiseList = false;
    } else {
      this.showPairwiseList =  true;
    }
    for (let i = 0; i < this.clusterList.length ; i++) {
      this.pairwiseList[i].pairwiseName = this.clusterList[i]._pairwiseCriteriaFile;
    }
    this.pairwiseCriteriaList = this.pairwise.pairwiseCriteriaList;
    this.generate = this.pairwise.generated;
    if (this.generate) {
      this.criteria =  this.pairwise.pairwiseCriteria;
    }
  }

  trackByIndex(index: number): any {
    return index;
  }
}
