export class PairwiseModel {

  private _pairwiseCriteriaList = ['zonetemperature', 'stage',
                                   'history-zonetemperature',
                                   'rated-power', 'room-type'];
  private _pairwiaseCalculation: string;
  private _pairwiseCriteria: Map<any, any>;

  constructor() {}


  get pairwiseCriteriaList(): string[] {
    return this._pairwiseCriteriaList;
  }

  set pairwiseCriteriaList(value: string[]) {
    this._pairwiseCriteriaList = value;
  }

  get pairwiaseCalculation(): string {
    return this._pairwiaseCalculation;
  }

  set pairwiaseCalculation(value: string) {
    this._pairwiaseCalculation = value;
  }

  get pairwiseCriteria(): Map<any, any> {
    return this._pairwiseCriteria;
  }

  set pairwiseCriteria(value: Map<any, any>) {
    this._pairwiseCriteria = value;
  }
}
