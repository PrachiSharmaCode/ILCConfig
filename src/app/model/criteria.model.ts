import {ILCCongig} from './ILCConfig.model';
import {FormulaCriteriaModel} from './formulaCriteria.model';
import {StatusCriteriaModel} from './statusCriteria.model';
import {MapperCriteriaModel} from './mapperCriteria.model';
import {ConstantCriteriaModel} from './constantCriteria.model';
import {HistoryCriteriaModel} from './historyCriteria.model';

export class CriteriaModel {

  private ilc: ILCCongig = new ILCCongig();
  private _formulaModel: FormulaCriteriaModel[][] = [];
  private _statusModel: StatusCriteriaModel[][] = [];
  private _mapperModel: MapperCriteriaModel[][] = [];
  private _constantModel: ConstantCriteriaModel[][] = [];
  private _historyModel: HistoryCriteriaModel[][] = [];
  private _critriaList: string[];
  private argument = 'argument';
  private _devices: {
    deviceName: string,
    devicePoints: string[]
  }[] = [];

  private _devicesAndPoint: {
    deviceName: string,
    devicePoints: string[]
    checked: boolean
  }[] = [];
  private _stageName: string;
  private _operationType: string[][];
  private _criteriaCalculation: string;

  private _criteriaFile: {
    StageName: {
      deviceTopic: string,
      criteriaName: {}[]
    }[]
  };

  updateCriteriaList(list: string[]) {
    this._critriaList = list;
  }


  get devicesAndPoint(): { deviceName: string; devicePoints: string[]; checked: boolean }[] {
    return this._devicesAndPoint;
  }

  set devicesAndPoint(value: { deviceName: string; devicePoints: string[]; checked: boolean }[]) {
    this._devicesAndPoint = value;
  }

  get devices(): {
    deviceName: string,
    devicePoints: string[]
  }[] {
    return this._devices;
  }

  updateDevceList(value: { deviceName: string; devicePoints: string[]; }[]) {
    this._devices = value;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  set devices(value: {
    deviceName: string,
    devicePoints: string[]
  }[]) {
    this._devices = value;
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
    return this._operationType;
  }

  set operationType(value: string[][]) {
    this._operationType = value;
  }

  updateOperationType(value: string[][]) {
    this._operationType = value;
  }

  get criteriaCalculation(): string {
    return this._criteriaCalculation;
  }

  set criteriaCalculation(value: string) {
    this._criteriaCalculation = value;
  }


  setFinalCalulation(list: string[][], l) {
    // console.log(list);
    // console.log(l);
    // console.log(this.formulaModel);
    // console.log(this.statusModel);
    // console.log(this.mapperModel);
    // console.log(this.historyModel);
    // console.log(this.constantModel);
    // console.log(this._devices.length);


    const jsonObh = {};
    for (let j = 0; j < this._devices.length; j++) {

      jsonObh[this._devices[j].deviceName] = {
        [this._devices[j].deviceName]: {
          curtail: {
            device_topic: 'CAMPUS/Buidling/' + +this._devices[j].deviceName,
          }
        }
      };

      for (let k = 0; k < list[0].length; k++) {

        if (this.formulaModel[j][k] !== null) {
          jsonObh[this._devices[j].deviceName][list[l][k]] = this.formulaModel[j][k];
        }
        if (this.statusModel[j][k] !== null) {
          jsonObh[this._devices[j].deviceName][list[l][k]] = this.statusModel[j][k];
        }
        if (this.mapperModel[j][k] !== null) {
          jsonObh[this._devices[j].deviceName][list[l][k]] = this.mapperModel[j][k];
        }
        if (this.constantModel[j][k] !== null) {
          jsonObh[this._devices[j].deviceName][list[l][k]] = this.constantModel[j][k];
        }
        if (this.historyModel[j][k] !== null) {
          jsonObh[this._devices[j].deviceName][list[l][k]] = this.historyModel[j][k];
        }
      }
    }

    // let jobj = {};
    // for (let j = 0; j < this._devices.length; j++) {
    //   jobj[this._devices[j].deviceName] = jsonObh;
    // }

    const cal = JSON.stringify(jsonObh, null, 4);
    this._criteriaCalculation = cal;
    return cal;
  }


  get formulaModel(): FormulaCriteriaModel[][] {
    return this._formulaModel;
  }

  set formulaModel(value: FormulaCriteriaModel[][]) {
    this._formulaModel = value;
  }

  get statusModel(): StatusCriteriaModel[][] {
    return this._statusModel;
  }

  set statusModel(value: StatusCriteriaModel[][]) {
    this._statusModel = value;
  }

  get mapperModel(): MapperCriteriaModel[][] {
    return this._mapperModel;
  }

  set mapperModel(value: MapperCriteriaModel[][]) {
    this._mapperModel = value;
  }


  get constantModel(): ConstantCriteriaModel[][] {
    return this._constantModel;
  }

  set constantModel(value: ConstantCriteriaModel[][]) {
    this._constantModel = value;
  }

  get historyModel(): HistoryCriteriaModel[][] {
    return this._historyModel;
  }

  set historyModel(value: HistoryCriteriaModel[][]) {
    this._historyModel = value;
  }
}
