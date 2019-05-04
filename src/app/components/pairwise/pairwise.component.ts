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
  clusterList: {
    _deviceCriteriaFile: string;
    _deviceCurtailmentFile: string;
    _pairwiseCriteriaFile: string;
    _clusterPriority: string
  }[];
  pairwiseCriteriaList: string[] = [];
  finalCalcultion: string;
  criteria = new Map<any, any>();
  generate = true;
  showPairwiseList: boolean;
  getCriteria = false;
  getCriteriaValue: string;
  sliderValue: number[][] = [];

  constructor() {
  }

  remainingList(num: number): string[] {
    const criteriaList: string[] = [];
    for (let i = num + 1; i < this.pairwiseCriteriaList.length; i++) {
      criteriaList.push(this.pairwiseCriteriaList[i]);
    }
    return criteriaList;
  }

  generateCamparisons() {
    if (this.generate === undefined) {
      let num = 0;
      while (num < this.pairwiseCriteriaList.length) {
        const hmap = new Map();
        for (let i = num + 1; i < this.pairwiseCriteriaList.length; i++) {
          hmap.set(this.pairwiseCriteriaList[i], 5);
        }
        this.criteria.set(this.pairwiseCriteriaList[num], hmap);
        num++;
      }
    } else {
      this.criteria = this.pairwise.pairwiseCriteria;
    }
    this.generate = true;
    this.pairwise.setpairwise(this.pairwiseCriteriaList, this.criteria, this.generate, this.finalCalcultion);
  }

  addCriteria() {
    this.getCriteria = true;
  }

  UpdateCriteriaList() {
    this.pairwiseCriteriaList.push(this.getCriteriaValue);
    this.pairwise.updateCrirteriaList(this.pairwiseCriteriaList);
    this.getCriteria = false;
    this.getCriteriaValue = '';
  }

  removeCriteria(index) {
    console.log('*******************');
    console.log(this.pairwiseCriteriaList);
    console.log('*******************');
    this.pairwiseCriteriaList.splice(index, 1);
  }

  updateValues(changeEvent, followCriteria, mainCriteria) {
    console.log(changeEvent.value);
    let criteraMap: Map<string, Map<string, string>>;
    criteraMap = this.criteria.get(mainCriteria);
    criteraMap.set(followCriteria, changeEvent.value);
    this.criteria.set(mainCriteria, criteraMap);
  }

  updateSliderValue(changeEvent, i, index) {
    if (this.sliderValue[index] === undefined) {
      this.sliderValue[index] = [];
    }
    console.log('inside click');
    console.log(changeEvent.value);
    if (changeEvent.value > 10) {
      this.sliderValue[index][i] = changeEvent.value - 10;
      console.log(this.sliderValue[index][i]);
    } else {
      if (changeEvent.value === 10) {
        this.sliderValue[index][i] = changeEvent.value - 8;
      }
      if (changeEvent.value === 9) {
        this.sliderValue[index][i] = changeEvent.value - 6;
      }
      if (changeEvent.value === 8) {
        this.sliderValue[index][i] = changeEvent.value - 4;
      }
      if (changeEvent.value === 7) {
        this.sliderValue[index][i] = changeEvent.value - 2;
      }
      if (changeEvent.value === 6) {
        this.sliderValue[index][i] = changeEvent.value;
      }
      if (changeEvent.value === 5) {
        this.sliderValue[index][i] = changeEvent.value + 2;
      }
      if (changeEvent.value === 4) {
        this.sliderValue[index][i] = changeEvent.value + 4;
      }
      if (changeEvent.value === 3) {
        this.sliderValue[index][i] = changeEvent.value + 6;
      }
      if (changeEvent.value === 2) {
        this.sliderValue[index][i] = changeEvent.value + 8;
      }
    }
  }

  savePairwiseCalculation(i) {
    const file = new Blob([this.pairwiseList[i].pairwiaseCalculation],
      {type: 'json'});
    FileSaver.saveAs(file, this.clusterList[i]._pairwiseCriteriaFile);
  }

  onRefreshButton(i) {
    this.pairwiseList[i].pairwiseCriteria = this.criteria;
    this.pairwiseList[i].pairwiseCriteriaList = this.pairwiseCriteriaList;
    this.finalCalcultion = this.pairwiseList[i].setFinalCalculation();
    this.pairwiseList[i].setpairwise(this.pairwiseCriteriaList, this.criteria, this.generate, this.finalCalcultion);
  }

  ngOnInit() {
    this.pairwiseList = this.mainModel.pairwiseList;
    this.clusterList = this.ilc.clusterList;
    if (this.clusterList.length === 0) {
      this.showPairwiseList = false;
    } else {
      this.showPairwiseList = true;
    }
    for (let i = 0; i < this.clusterList.length; i++) {
      this.pairwiseList[i].pairwiseName = this.clusterList[i]._pairwiseCriteriaFile;
    }
    this.pairwiseCriteriaList = this.pairwise.pairwiseCriteriaList;
    this.sliderValue = new Array(this.pairwiseCriteriaList.length);
    for (let index = 0; index <= this.pairwiseCriteriaList.length; index++) {
      if (this.sliderValue[index] === undefined) {
        this.sliderValue[index] = [];
      }
    }
    console.log(this.sliderValue);
    this.generate = this.pairwise.generated;
    if (this.generate) {
      this.criteria = this.pairwise.pairwiseCriteria;
    }
  }

  trackByIndex(index: number): any {
    return index;
  }
}
