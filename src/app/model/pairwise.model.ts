export class PairwiseModel {

  private _pairwiseName: string;
  private _pairwiseCriteriaList = ['zonetemperature', 'stage',
    'history-zonetemperature',
    'rated-power', 'room-type'];
  private _pairwiaseCalculation: string;
  private _pairwiseCriteria: Map<any, any>;
  private _generated: boolean;

  constructor(pairwiseName?: string) {
    this._pairwiseName = pairwiseName;
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

  get pairwiseCriteriaList(): string[] {
    return this._pairwiseCriteriaList;
  }

  print() {
    console.log(this._generated);
    console.log(this._pairwiseCriteriaList);
    console.log(this._pairwiaseCalculation);
    console.log(this._pairwiseCriteria);
  }

  set pairwiseCriteriaList(value: string[]) {
    this._pairwiseCriteriaList = value;
  }

  get generated(): boolean {
    return this._generated;
  }

  updateCrirteriaList(criteriaList: string[]) {
    this._pairwiseCriteriaList = criteriaList;
  }

  set generated(value: boolean) {
    this._generated = value;
  }

  get pairwiaseCalculation(): string {
    return this._pairwiaseCalculation;
  }

  setFinalCalculation() {
    console.log(this.pairwiseCriteria)
    let obj = [];
    let num = 0;
    while (num < this._pairwiseCriteriaList.length) {
      let oobj = [];
      const mainCriteria = this._pairwiseCriteriaList[num];
      const hmap = this._pairwiseCriteria.get(mainCriteria);
      for (let i = num + 1; i < this._pairwiseCriteriaList.length; i++) {
        let followCriteria = '';
        let followCriteriaValue = '';
        followCriteria = this._pairwiseCriteriaList[i];
        followCriteriaValue = hmap.get(this._pairwiseCriteriaList[i]);
        let check = {};
        check = {[followCriteria]: followCriteriaValue};
        oobj.push(check);
      }
      obj.push({
        [mainCriteria]: {
          oobj
        }
      });
      num++;
    }
    let cal = JSON.stringify(obj, null, 4)
      .replace('[', '').replace(']', '')
      .replace(/\"oobj\":/g, '');
    return cal;
  }

  set pairwiaseCalculation(value: string) {
    this._pairwiaseCalculation = value;
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
