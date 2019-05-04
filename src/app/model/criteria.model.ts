import {ILCCongig} from './ILCConfig.model';
import {FormulaCriteriaModel} from './formulaCriteria.model';
import {StatusCriteriaModel} from './statusCriteria.model';
import {MapperCriteriaModel} from "./mapperCriteria.model";
import {ConstantCriteriaModel} from "./constantCriteria.model";
import {HistoryCriteriaModel} from "./historyCriteria.model";

export class CriteriaModel {

  private ilc: ILCCongig = new ILCCongig();
  private _formulaModel: FormulaCriteriaModel[] = [];
  private _statusModel: StatusCriteriaModel =  new StatusCriteriaModel();
  private _mapperModel: MapperCriteriaModel = new MapperCriteriaModel();
  private _constantModel: ConstantCriteriaModel =  new ConstantCriteriaModel();
  private _historyModel: HistoryCriteriaModel =  new HistoryCriteriaModel();
  private _critriaList: string[];
  private devices = this.ilc.devices;
  private _stageName: string;
  private _operationType: string[][];
  private _criteriaCalculation: string;

  private _criteriaFile: {
    StageName: {
      deviceTopic: string,
      criteriaName: {}[]
    }[]
  };

  /***Formula***/

  formulaModelArr: FormulaCriteriaModel[] = [];

  formula: {
    argument: string[],
    operation: string,
    minimum: number,
    maximum: number
  }[] = [];
  private _arguments: string[];
  private _operation: string;
  private _minimum: number;
  private _maximum: number;

  /***Status***/

  /***Mapper***/

  /***Constant***/

  /***History***/
  //
  // getAllModels(formula: FormulaCriteriaModel) {
  //   this._formulaModel = formula;
  // }

  updateFormulaArr(formulaArr: FormulaCriteriaModel[]){
    this.formulaModelArr = formulaArr;
  }

  get arguments(): string[] {
    return this._arguments;
  }

  updateCriteriaList(list: string[]) {
    this._critriaList = list;
  }

  get critriaList(): string[] {
    return this._critriaList;
  }

  set critriaList(value: string[]) {
    this._critriaList = value;
  }

  get stageName(): string {
    return this._stageName;
  }

  set stageName(value: string) {
    this._stageName = value;
  }

  get operationType(): string[][] {
    this._operationType = [['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']];
    return this._operationType;
  }

  set operationType(value: string[][]) {
    this._operationType = value;
  }

  get criteriaCalculation(): string {
    return this._criteriaCalculation;
  }

  set criteriaCalculation(value: string) {
    this._criteriaCalculation = value;
  }

  get operation(): string {
    return this._operation;
  }

  set operation(value: string) {
    this._operation = value;
  }

  get minimum(): number {
    return this._minimum;
  }

  set minimum(value: number) {
    this._minimum = value;
  }

  get maximum(): number {
    return this._maximum;
  }

  set maximum(value: number) {
    this._maximum = value;
  }

  updateArguments(argument: string[]) {
    this._arguments = argument;
  }

  // updateFormulaOpration(argument, operation, minimum, maximum, formula) {
  //   this.formulaModel = new FormulaCriteriaModel(argument, maximum, minimum, operation);
  //   this.formulaModel.updateFormulaModel(argument, maximum, minimum, operation, formula);
  // }

  setFinalCalulation(list: string[]) {
    const obj = [];
    for (let i = 0; i <= this.devices.length; i++) {
      for (let j = 0; j <= list.length; j++) {
        obj[i] = {
          [this.stageName]: {
            device_topic: this.devices[i],
            // [list[j]]: this._formulaModel.formulaCalculate
          }
        };
      }
    }
    this._criteriaCalculation = JSON.stringify(obj, null, 4);
    return this._criteriaCalculation;
  }


  get formulaModel(): FormulaCriteriaModel[] {
    return this._formulaModel;
  }

  set formulaModel(value: FormulaCriteriaModel[]) {
    this._formulaModel = value;
  }

  get statusModel(): StatusCriteriaModel {
    return this._statusModel;
  }

  set statusModel(value: StatusCriteriaModel) {
    this._statusModel = value;
  }

  get mapperModel(): MapperCriteriaModel {
    return this._mapperModel;
  }

  set mapperModel(value: MapperCriteriaModel) {
    this._mapperModel = value;
  }


  get constantModel(): ConstantCriteriaModel {
    return this._constantModel;
  }

  set constantModel(value: ConstantCriteriaModel) {
    this._constantModel = value;
  }

  get historyModel(): HistoryCriteriaModel {
    return this._historyModel;
  }

  set historyModel(value: HistoryCriteriaModel) {
    this._historyModel = value;
  }
}
