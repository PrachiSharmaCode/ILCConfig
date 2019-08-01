export class PairwiseModel {

  private _pairwiseName: string;
  private _pairwiseCriteriaList: string[][] = [];
  private _pairwiaseCalculation: string;
  private _pairwiseCriteria: Map<any, any>;
  private _generated: boolean;
  private _sliderValue: number[][] = [];

  constructor(pairwiseName?: string) {
    this._pairwiseName = pairwiseName;
  }

  get sliderValue(): number[][] {
    return this._sliderValue;
  }

  set sliderValue(value: number[][]) {
    this._sliderValue = value;
  }

  updateSliderValue(slider: number[][]) {
    this._sliderValue = slider;
    console.log(this._sliderValue);
  }

  get pairwiseName(): string {
    return this._pairwiseName;
  }

  set pairwiseName(value: string) {
    this._pairwiseName = value;
  }

  setpairwise(pairwiseList, pairwiseCriteria, generate, calculation) {
    this._pairwiseCriteriaList = pairwiseList;
    this._pairwiseCriteria = pairwiseCriteria;
    this._generated = true;
    this._pairwiaseCalculation = calculation;
  }

  updateMap(pairMap) {
    this._pairwiseCriteria = pairMap;
  }

  get pairwiseCriteriaList(): string[][] {
    return this._pairwiseCriteriaList;
  }

  print() {
    console.log(this._generated);
    console.log(this._pairwiseCriteriaList);
    console.log(this._pairwiaseCalculation);
    console.log(this._pairwiseCriteria);
  }

  set pairwiseCriteriaList(value: string[][]) {
    this._pairwiseCriteriaList = value;
  }

  get generated(): boolean {
    return this._generated;
  }

  updateCrirteriaList(criteriaList: string[][]) {
    this._pairwiseCriteriaList = criteriaList;
  }

  set generated(value: boolean) {
    this._generated = value;
  }

  get pairwiaseCalculation(): string {
    return this._pairwiaseCalculation;
  }

  setFinalCalculation(i) {
    console.log(this._sliderValue);
    let jsonObh = {};
    let count = 1;
    console.log(this._pairwiseCriteriaList[i].length);

    for (let j = 0; j < this._pairwiseCriteriaList[i].length; j++) {
      jsonObh[this._pairwiseCriteriaList[i][j]] = {};
      for (let k = 0; k < this._sliderValue[j].length; k++) {
        if (this._sliderValue[j][k] === null || this._sliderValue[j][k] === undefined) {
          this._sliderValue[j][k] = 1;
        }
        jsonObh[this._pairwiseCriteriaList[i][j]][this._pairwiseCriteriaList[i][k + count]] = 1 / this._sliderValue[j][k];
      }
      count++;
    }
    let cal = JSON.stringify(jsonObh, null, 4);
    console.log(cal);
    this._pairwiaseCalculation = cal;
    return cal;
  }

  get pairwiseCriteria(): Map<any, any> {
    if (this._pairwiseCriteria === undefined) {
      return new Map()[''];
    }
    return this._pairwiseCriteria;
  }

  set pairwiseCriteria(value: Map<any, any>) {
    this._pairwiseCriteria = value;
  }
}
