import {PairwiseModel} from './pairwise.model';
import {CurtailmentModel} from './curtailment.model';
import {CriteriaModel} from './criteria.model';

export class MainModel {

  private _pairwiseList: PairwiseModel[] = [];
  private _curtailmentList: CurtailmentModel[] = [];
  private _criteriaModelList: CriteriaModel[] = [];

  addPairwise(pairwise: PairwiseModel) {
    this._pairwiseList.push(pairwise);
  }

  addCurtailment(curtailment: CurtailmentModel) {
    this._curtailmentList.push(curtailment);
  }

  addCriteria(criteria: CriteriaModel) {
    this._criteriaModelList.push(criteria);
  }

  print() {
    console.log(this._pairwiseList);
    console.log(this._curtailmentList);
  }

  get pairwiseList(): PairwiseModel[] {
    return this._pairwiseList;
  }

  set pairwiseList(value: PairwiseModel[]) {
    this._pairwiseList = value;
  }


  get curtailmentList(): CurtailmentModel[] {
    return this._curtailmentList;
  }

  set curtailmentList(value: CurtailmentModel[]) {
    this._curtailmentList = value;
  }

  get criteriaModelList(): CriteriaModel[] {
    return this._criteriaModelList;
  }

  set criteriaModelList(value: CriteriaModel[]) {
    this._criteriaModelList = value;
  }

  constructor() {
  }
}
