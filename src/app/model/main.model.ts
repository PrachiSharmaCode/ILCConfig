import {PairwiseModel} from './pairwise.model';

export class MainModel {

  private _pairwiseList: PairwiseModel[] = [];

  addPairwise(pairwise: PairwiseModel) {
    this._pairwiseList.push(pairwise);
  }

  print() {
    console.log(this._pairwiseList);
  }

  get pairwiseList(): PairwiseModel[] {
    return this._pairwiseList;
  }

  set pairwiseList(value: PairwiseModel[]) {
    this._pairwiseList = value;
  }

  constructor() {}
}
