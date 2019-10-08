import {Component, Input, OnInit} from '@angular/core';
import * as FileSaver from 'file-saver';
import {PairwiseModel} from '../../model/pairwise.model';
import {MainModel} from '../../model/main.model';
import {ILCCongig} from '../../model/ILCConfig.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


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


  showAugmentSection(i) {
    this.pairwiseList[i].showAugmentSection[i] = true;

    for (let j = 0; j < this.pairwiseList[i].sliderValue.length; j++) {
      for (let k = 0; k < this.pairwiseList[i].sliderValue[j].length; k++) {
        this.pairwiseList[i].augmentSliderValue[j][k] = this.pairwiseList[i].sliderValue[j][k];
      }
    }

    // this.pairwiseList[i].augmentSliderValue = this.pairwiseList[i].sliderValue;
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
    this.pairwiseCriteriaList[i][index] = this.getCriteriaValue;
    this.pairwise.updateCrirteriaList(this.pairwiseCriteriaList);
    this.pairwiseList[i].sliderValue.push([]);
    for (let j = 0; j < this.pairwiseList[i].sliderValue.length; j++) {
      this.pairwiseList[i].sliderValue[j] = [];
      for (let k = j + 1; k < this.pairwiseList[i].sliderValue.length; k++) {
        this.pairwiseList[i].sliderValue[j][k] = 1;
      }
    }
    this.getCriteria = false;
    this.getCriteriaValue = '';
  }

  removeCriteria(i, index) {
    this.pairwiseCriteriaList[i].splice(index, 1);
    // this.pairwiseList[i].sliderValue.splice(index, 1);
    this.pairwiseList[i].sliderValue.length--;
    for (let j = 0; j < this.pairwiseList[i].sliderValue.length; j++) {
      this.pairwiseList[i].sliderValue[j] = [];
      for (let k = j + 1; k < this.pairwiseList[i].sliderValue.length; k++) {
        this.pairwiseList[i].sliderValue[j][k] = 1;
      }
    }
    this.pairwise.updateCrirteriaList(this.pairwiseCriteriaList);
  }

  updateAugmentSliderValue(changeEvent, i, index, j) {
    if (this.pairwiseList[j].augmentSliderValue[index] === undefined) {
      this.pairwiseList[j].augmentSliderValue[index] = [];
    }
    if (changeEvent.value > 10) {
      this.pairwiseList[j].augmentSliderValue[index][i] = changeEvent.value;
    } else {
      if (changeEvent.value === 10) {
        this.pairwiseList[j].augmentSliderValue[index][i] = changeEvent.value - 8;
      }
      if (changeEvent.value === 9) {
        this.pairwiseList[j].augmentSliderValue[index][i] = changeEvent.value - 6;
      }
      if (changeEvent.value === 8) {
        this.pairwiseList[j].augmentSliderValue[index][i] = changeEvent.value - 4;
      }
      if (changeEvent.value === 7) {
        this.pairwiseList[j].augmentSliderValue[index][i] = changeEvent.value - 2;
      }
      if (changeEvent.value === 6) {
        this.pairwiseList[j].augmentSliderValue[index][i] = changeEvent.value;
      }
      if (changeEvent.value === 5) {
        this.pairwiseList[j].augmentSliderValue[index][i] = changeEvent.value + 2;
      }
      if (changeEvent.value === 4) {
        this.pairwiseList[j].augmentSliderValue[index][i] = changeEvent.value + 4;
      }
      if (changeEvent.value === 3) {
        this.pairwiseList[j].augmentSliderValue[index][i] = changeEvent.value + 6;
      }
      if (changeEvent.value === 2) {
        this.pairwiseList[j].augmentSliderValue[index][i] = changeEvent.value + 8;
      }
    }
  }

  updateSliderValue(changeEvent, i, index, j) {
    if (this.pairwiseList[j].sliderValue[index] === undefined) {
      this.pairwiseList[j].sliderValue[index] = [];
    }
    if (changeEvent.value > 10) {
      this.pairwiseList[j].sliderValue[index][i] = changeEvent.value;
    } else {
      if (changeEvent.value === 10) {
        this.pairwiseList[j].sliderValue[index][i] = changeEvent.value - 8;
      }
      if (changeEvent.value === 9) {
        this.pairwiseList[j].sliderValue[index][i] = changeEvent.value - 6;
      }
      if (changeEvent.value === 8) {
        this.pairwiseList[j].sliderValue[index][i] = changeEvent.value - 4;
      }
      if (changeEvent.value === 7) {
        this.pairwiseList[j].sliderValue[index][i] = changeEvent.value - 2;
      }
      if (changeEvent.value === 6) {
        this.pairwiseList[j].sliderValue[index][i] = changeEvent.value;
      }
      if (changeEvent.value === 5) {
        this.pairwiseList[j].sliderValue[index][i] = changeEvent.value + 2;
      }
      if (changeEvent.value === 4) {
        this.pairwiseList[j].sliderValue[index][i] = changeEvent.value + 4;
      }
      if (changeEvent.value === 3) {
        this.pairwiseList[j].sliderValue[index][i] = changeEvent.value + 6;
      }
      if (changeEvent.value === 2) {
        this.pairwiseList[j].sliderValue[index][i] = changeEvent.value + 8;
      }
    }
  }

  savePairwiseCalculation(i) {
    const file = new Blob([this.pairwiseList[i].pairwiaseCalculation], {type: 'json'});
    FileSaver.saveAs(file, this.clusterList[i].pairwise_criteria_file + '.json');
  }

  pairwiseSort(event: CdkDragDrop<string[]>, i) {
    moveItemInArray(this.pairwiseCriteriaList[i], event.previousIndex, event.currentIndex);
  }

  updateSliderColor(critera, main, val) {
    console.log(val);
    let slider = document.getElementById(critera + '%' + main);
    let ring = slider.getElementsByClassName('mat-slider-focus-ring');

    console.log(ring);
    if (val.value > 11) {
      slider.style.color = 'green';
    }
    if (val.value < 11) {
      slider.style.color = 'red';
    }
  }

  onRefreshButton(i) {
    this.pairwiseList[i].pairwiseCriteria = this.criteria;
    this.pairwiseList[i].pairwiseCriteriaList = this.pairwiseCriteriaList;
    this.pairwiseList[i].setFinalCalculation(i);
  }

  ngOnInit() {
    this.pairwiseList = this.mainModel.pairwiseList;
    this.pairwiseCriteriaList = this.mainModel.paireiseCriteriaList;
    this.clusterList = this.ilc.clusterList;
    this.showPairwiseList = this.clusterList.length !== 0;
    for (let i = 0; i < this.clusterList.length; i++) {
      this.pairwiseList[i].updateCrirteriaList(this.pairwiseCriteriaList);
      this.pairwiseList[i].pairwiseName = this.clusterList[i].pairwise_criteria_file;
      this.sliderValue = new Array(this.pairwiseList[i].pairwiseCriteriaList[i].length);
      for (let j = 0; j < this.sliderValue.length; j++) {
        this.pairwiseList[i].sliderValue[j] = [];
        this.pairwiseList[i].augmentSliderValue[j] = [];
        for (let k = j + 1; k < this.sliderValue.length; k++) {
          this.pairwiseList[i].sliderValue[j][k] = 1;
          this.pairwiseList[i].augmentSliderValue[j][k] = 1;
        }
      }
    }
    this.generate = this.pairwise.generated;
    if (this.generate) {
      this.criteria = this.pairwise.pairwiseCriteria;
    }
  }

  trackByIndex(index: number): any {
    return index;
  }
}
