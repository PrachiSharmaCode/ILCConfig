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
    pairwise_criteria_file: string;
    _clusterPriority: string
  }[];
  pairwiseCriteriaList: string[][] = [];
  finalCalcultion: string;
  criteria = new Map<any, any>();
  generate = true;
  showPairwiseList: boolean;
  getCriteria = false;
  getCriteriaValue: string;
  sliderValue: number[][] = [];

  constructor() {
  }

  remainingList(i: number, num: number): string[] {
    const criteriaList: string[] = [];
    for (let j = num + 1; j < this.pairwiseCriteriaList[i].length; j++) {
      criteriaList.push(this.pairwiseCriteriaList[i][j]);
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

  UpdateCriteriaList(i, index) {
    console.log(i);
    console.log(index);
    this.pairwiseCriteriaList[i][index] = this.getCriteriaValue;
    this.pairwise.updateCrirteriaList(this.pairwiseCriteriaList);
    this.getCriteria = false;
    this.getCriteriaValue = '';
  }

  removeCriteria(i, index) {
    this.pairwiseCriteriaList[i].splice(index, 1);
    this.pairwiseList[i].sliderValue.splice(index, 1);
    console.log('*******************');
    console.log(this.pairwiseCriteriaList);
    console.log('*******************');
    this.pairwise.updateCrirteriaList(this.pairwiseCriteriaList);
  }

  // updateValues(changeEvent, followCriteria, mainCriteria) {
  //   console.log(changeEvent.value);
  //   let criteraMap: Map<string, Map<string, string>>;
  //   criteraMap = this.criteria.get(mainCriteria);
  //   criteraMap.set(followCriteria, changeEvent.value);
  //   this.criteria.set(mainCriteria, criteraMap);
  // }

  updateSliderValue(changeEvent, i, index, j) {
    if (this.pairwiseList[j].sliderValue[index] === undefined) {
      this.pairwiseList[j].sliderValue[index] = [];
    }
    if (changeEvent.value > 10) {
      this.pairwiseList[j].sliderValue[index][i] = changeEvent.value - 10;
      console.log(this.pairwiseList[j].sliderValue[index][i]);
      console.log(this.pairwiseList[j].sliderValue);
    } else {
      if (changeEvent.value === 10) {
        this.pairwiseList[j].sliderValue[index][i] = 1 / (changeEvent.value - 8);
      }
      if (changeEvent.value === 9) {
        this.pairwiseList[j].sliderValue[index][i] = 1 / (changeEvent.value - 6);
      }
      if (changeEvent.value === 8) {
        this.pairwiseList[j].sliderValue[index][i] = 1 / (changeEvent.value - 4);
      }
      if (changeEvent.value === 7) {
        this.pairwiseList[j].sliderValue[index][i] = 1 / (changeEvent.value - 2);
      }
      if (changeEvent.value === 6) {
        this.pairwiseList[j].sliderValue[index][i] = 1 / (changeEvent.value);
      }
      if (changeEvent.value === 5) {
        this.pairwiseList[j].sliderValue[index][i] = 1 / (changeEvent.value + 2);
      }
      if (changeEvent.value === 4) {
        this.pairwiseList[j].sliderValue[index][i] = 1 / (changeEvent.value + 4);
      }
      if (changeEvent.value === 3) {
        this.pairwiseList[j].sliderValue[index][i] = 1 / (changeEvent.value + 6);
      }
      if (changeEvent.value === 2) {
        this.pairwiseList[j].sliderValue[index][i] = 1 / (changeEvent.value + 8);
      }
      console.log(this.pairwiseList[j].sliderValue[index][j]);
    }
  }

  savePairwiseCalculation(i) {
    const file = new Blob([this.pairwiseList[i].pairwiaseCalculation],
      {type: 'json'});
    FileSaver.saveAs(file, this.clusterList[i].pairwise_criteria_file);
  }

  onRefreshButton(i) {
    this.pairwiseList[i].pairwiseCriteria = this.criteria;
    this.pairwiseList[i].pairwiseCriteriaList = this.pairwiseCriteriaList;
    console.log(this.pairwiseList[i].setFinalCalculation(i));
  }


  ngOnInit() {
    this.pairwiseList = this.mainModel.pairwiseList;
    this.pairwiseCriteriaList = this.mainModel.paireiseCriteriaList;
    console.log(this.pairwiseCriteriaList);
    this.clusterList = this.ilc.clusterList;
    this.showPairwiseList = this.clusterList.length !== 0;

    for (let i = 0; i < this.clusterList.length; i++) {
      this.pairwiseList[i].updateCrirteriaList(this.pairwiseCriteriaList);
      this.pairwiseList[i].pairwiseName = this.clusterList[i].pairwise_criteria_file;
      this.sliderValue = new Array(this.pairwiseList[i].pairwiseCriteriaList[i].length);
      for (let j = 0; j < this.sliderValue.length; j++) {
        this.pairwiseList[i].sliderValue[j] = [];
        this.pairwiseList[i].sliderValue[j].fill(1);
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
