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
  private _result = '';
  private _campus: string;
  private _building: string;
  private curtail = 'curtail';
  private _augment = 'augment';

  private _showAugmentSection: boolean[] = [];
  private _augmentFormulaModel: FormulaCriteriaModel[][] = [];
  private _augmentStatusModel: StatusCriteriaModel[][] = [];
  private _augmentMapperModel: MapperCriteriaModel[][] = [];
  private _augmentConstantModel: ConstantCriteriaModel[][] = [];
  private _augmentHistoryModel: HistoryCriteriaModel[][] = [];
  private _critriaList: string[];
  private argument = 'argument';
  private _devices: {
    deviceName: string,
    devicePoints: string[]
  }[][] = [];

  private _devicesAndPoint: {
    deviceName: string,
    devicePoints: string[],
    checked: boolean
  }[] = [];

  private _stageName: string;
  private _operationType: string[][];
  private _criteriaCalculation: string;

  get campus(): string {
    return this._campus;
  }

  set campus(value: string) {
    this._campus = value;
  }

  get building(): string {
    return this._building;
  }

  set building(value: string) {
    this._building = value;
  }

  get showAugmentSection(): boolean[] {
    return this._showAugmentSection;
  }

  set showAugmentSection(value: boolean[]) {
    this._showAugmentSection = value;
  }

  updateaugmentList(index) {
    this._showAugmentSection[index] = true;
    console.log(this._showAugmentSection);
  }

  get augmentFormulaModel(): FormulaCriteriaModel[][] {
    return this._augmentFormulaModel;
  }

  set augmentFormulaModel(value: FormulaCriteriaModel[][]) {
    this._augmentFormulaModel = value;
  }

  get augmentStatusModel(): StatusCriteriaModel[][] {
    return this._augmentStatusModel;
  }

  set augmentStatusModel(value: StatusCriteriaModel[][]) {
    this._augmentStatusModel = value;
  }

  get augmentMapperModel(): MapperCriteriaModel[][] {
    return this._augmentMapperModel;
  }

  set augmentMapperModel(value: MapperCriteriaModel[][]) {
    this._augmentMapperModel = value;
  }

  get augmentConstantModel(): ConstantCriteriaModel[][] {
    return this._augmentConstantModel;
  }

  set augmentConstantModel(value: ConstantCriteriaModel[][]) {
    this._augmentConstantModel = value;
  }

  get augmentHistoryModel(): HistoryCriteriaModel[][] {
    return this._augmentHistoryModel;
  }

  set augmentHistoryModel(value: HistoryCriteriaModel[][]) {
    this._augmentHistoryModel = value;
  }

  updateCriteriaList(list: string[]) {
    this._critriaList = list;
  }

  updateAugmentSection() {
    this._augmentFormulaModel = this._formulaModel;
    this._augmentStatusModel = this._statusModel;
    this._augmentMapperModel = this._mapperModel;
    this._augmentConstantModel = this._constantModel;
    this._augmentHistoryModel = this._historyModel;
  }

  updateAugmentFormula() {
    for (let i = 0; i < this.formulaModel.length; i++) {
      for (let j = 0; j < this.formulaModel[i].length; j++) {
        if (this.formulaModel[i][j] === null) {
          if (this.augmentFormulaModel[i] === undefined) {
            this.augmentFormulaModel[i] = [];
          }
          this.augmentFormulaModel[i][j] = null;
        } else {
          if (this.augmentFormulaModel[i] === undefined) {
            this.augmentFormulaModel[i] = [];
          }
          this.augmentFormulaModel[i][j] = new FormulaCriteriaModel();
          this.augmentFormulaModel[i][j].argument = this.formulaModel[i][j].argument;
          this.augmentFormulaModel[i][j].maximun = this.formulaModel[i][j].maximun;
          this.augmentFormulaModel[i][j].mini = this.formulaModel[i][j].mini;
          this.augmentFormulaModel[i][j].operation = this.formulaModel[i][j].operation;
        }


        if (this.statusModel[i][j] === null) {
          if (this.augmentStatusModel[i] === undefined) {
            this.augmentStatusModel[i] = [];
          }
          this.augmentStatusModel[i][j] = null;
        } else {
          if (this.augmentStatusModel[i] === undefined) {
            this.augmentStatusModel[i] = [];
          }
          this.augmentStatusModel[i][j] = new StatusCriteriaModel();
          this.augmentStatusModel[i][j].pointName = this.statusModel[i][j].pointName;
          this.augmentStatusModel[i][j].offValue = this.statusModel[i][j].offValue;
          this.augmentStatusModel[i][j].onValue = this.statusModel[i][j].onValue;
        }

        if (this.mapperModel[i][j] === null) {
          if (this.augmentMapperModel[i] === undefined) {
            this.augmentMapperModel[i] = [];
          }
          this.augmentMapperModel[i][j] = null;
        } else {
          if (this.augmentMapperModel[i] === undefined) {
            this.augmentMapperModel[i] = [];
          }
          this.augmentMapperModel[i][j] = new MapperCriteriaModel();
          this.augmentMapperModel[i][j].distName = this.mapperModel[i][j].distName;
          this.augmentMapperModel[i][j].mapKey = this.mapperModel[i][j].mapKey;
        }

        if (this.historyModel[i][j] === null) {
          if (this.augmentHistoryModel[i] === undefined) {
            this.augmentHistoryModel[i] = [];
          }
          this.augmentHistoryModel[i][j] = null;
        } else {
          if (this.augmentHistoryModel[i] === undefined) {
            this.augmentHistoryModel[i] = [];
          }
          this.augmentHistoryModel[i][j] = new HistoryCriteriaModel();
          this.augmentHistoryModel[i][j].historyMaximum = this.historyModel[i][j].historyMaximum;
          this.augmentHistoryModel[i][j].historyMinimum = this.historyModel[i][j].historyMinimum;
          this.augmentHistoryModel[i][j].comparisonType = this.historyModel[i][j].comparisonType;
          this.augmentHistoryModel[i][j].historyPointName = this.historyModel[i][j].historyPointName;
          this.augmentHistoryModel[i][j].previousTime = this.historyModel[i][j].previousTime;
        }

        if (this.constantModel[i][j] === null) {
          if (this.augmentConstantModel[i] === undefined) {
            this.augmentConstantModel[i] = [];
          }
          this.augmentConstantModel[i][j] = null;
        } else {
          if (this.augmentConstantModel[i] === undefined) {
            this.augmentConstantModel[i] = [];
          }
          this.augmentConstantModel[i][j] = new ConstantCriteriaModel();
          this.augmentConstantModel[i][j].conatant = this.constantModel[i][j].conatant;
          this.augmentConstantModel[i][j].value = this.constantModel[i][j].value;
        }
      }
    }
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
  }[][] {
    return this._devices;
  }

  updateDevceList(value: { deviceName: string; devicePoints: string[]; }[][]) {
    this._devices = value;
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  set devices(value: {
    deviceName: string,
    devicePoints: string[]
  }[][]) {
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

    console.log(this.campus);
    console.log(this.building)

    let jsonObh = {};

    for (let j = 0; j < this._devices.length; j++) {

      console.log(this._devices[l][j]);

      jsonObh[this._devices[l][j].deviceName] = {
        [this._devices[l][j].deviceName]: {
          [this.curtail]: {
            device_topic: this.campus + '/' + this.building + '/'  + this._devices[l][j].deviceName,
          }
        }
      };

      for (let k = 0; k < list[0].length; k++) {

        if (this.formulaModel[j][k] !== null) {
          jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this.curtail][list[l][k]]
            = this.formulaModel[j][k];
        }
        if (this.statusModel[j][k] !== null) {
          jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this.curtail][list[l][k]]
            = this.statusModel[j][k];
        }
        if (this.mapperModel[j][k] !== null) {
          jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this.curtail][list[l][k]]
            = this.mapperModel[j][k];
        }
        if (this.constantModel[j][k] !== null) {
          jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this.curtail][list[l][k]]
            = this.constantModel[j][k];
        }
        if (this.historyModel[j][k] !== null) {
          jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this.curtail][list[l][k]]
            = this.historyModel[j][k];
        }
      }

      console.log(this._showAugmentSection);
      if (this._showAugmentSection[j]) {

        jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment] = {
          device_topic: this.campus + this.building + this._devices[l][j].deviceName
        };
        for (let k = 0; k < list[0].length; k++) {

          if (this.augmentFormulaModel[j][k] !== null) {
            jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment][list[l][k]]
              = this.augmentFormulaModel[j][k];
          }
          if (this.augmentStatusModel[j][k] !== null) {
            jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment][list[l][k]]
              = this.augmentStatusModel[j][k];
          }
          if (this.augmentMapperModel[j][k] !== null) {
            jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment][list[l][k]]
              = this.augmentMapperModel[j][k];
          }
          if (this.augmentConstantModel[j][k] !== null) {
            jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment][list[l][k]]
              = this.augmentConstantModel[j][k];
          }
          if (this.augmentHistoryModel[j][k] !== null) {
            jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment][list[l][k]]
              = this.augmentHistoryModel[j][k];
          }
        }
      }
    }

    let cal = JSON.stringify(jsonObh, null, 4).replace('\"obj\": {', '').replace('\"augjson\": {}', '');

    console.log(this._result);

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
