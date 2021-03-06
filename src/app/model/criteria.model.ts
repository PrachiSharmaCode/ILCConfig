import {ILCCongig} from './ILCConfig.model';
import {FormulaCriteriaModel} from './formulaCriteria.model';
import {StatusCriteriaModel} from './statusCriteria.model';
import {MapperCriteriaModel} from './mapperCriteria.model';
import {ConstantCriteriaModel} from './constantCriteria.model';
import {HistoryCriteriaModel} from './historyCriteria.model';

export class CriteriaModel {

  private always = 'always';
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
  private operationArgs = 'operation_args';
  private argumentNumber = 0;
  private mapper = 'mapper';
  private privateOffice = 'Private Office';
  private conference = 'Conference Room';

  private test: string[] = [];

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

          this.augmentFormulaModel[i][j].setoperation_args = this.formulaModel[i][j].getoperation_args;
          this.augmentFormulaModel[i][j].operationArgsCheck = this.formulaModel[i][j].operationArgsCheck;

          this.augmentFormulaModel[i][j].maximun = this.formulaModel[i][j].maximun;
          this.augmentFormulaModel[i][j].mini = this.formulaModel[i][j].mini;
          this.augmentFormulaModel[i][j].getoperation = this.formulaModel[i][j].getoperation;
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
          this.augmentMapperModel[i][j].setdist_name = this.mapperModel[i][j].getdist_name;
          this.augmentMapperModel[i][j].setmap_key = this.mapperModel[i][j].getmap_key;
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
          this.augmentHistoryModel[i][j].sethistoryMaximum = this.historyModel[i][j].gethistoryMaximum;
          this.augmentHistoryModel[i][j].sethistoryMinimum = this.historyModel[i][j].gethistoryMinimum;
          this.augmentHistoryModel[i][j].setcomparisonType = this.historyModel[i][j].getcomparisonType;
          this.augmentHistoryModel[i][j].sethistoryPointName = this.historyModel[i][j].gethistoryPointName;
          this.augmentHistoryModel[i][j].setpreviousTime = this.historyModel[i][j].getpreviousTime;
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
          this.augmentConstantModel[i][j].setvalue = this.constantModel[i][j].getvalue;
        }
      }
    }


    for (let s = 0; s < this.statusModel.length; s++) {
      for (let t = 0; t < this.statusModel[s].length; t++) {

        if (this.statusModel[s][t] === null) {
          if (this.augmentStatusModel[s] === undefined) {
            this.augmentStatusModel[s] = [];
          }
          this.augmentStatusModel[s][t] = null;
        } else {
          if (this.augmentStatusModel[s] === undefined) {
            this.augmentStatusModel[s] = [];
          }
          this.augmentStatusModel[s][t] = new StatusCriteriaModel();
          this.augmentStatusModel[s][t].setpointName = this.statusModel[s][t].getpointName;
          this.augmentStatusModel[s][t].setoffValue = this.statusModel[s][t].getoffValue;
          this.augmentStatusModel[s][t].setonValue = this.statusModel[s][t].getonValue;
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

  getTestFromformula() {
    if (this.formulaModel !== undefined) {
      for (let i = 0; i < this.formulaModel.length; i++) {
        for (let j = 0; j < this.formulaModel.length; j++) {
          if (this.formulaModel[i][j] !== undefined && this.formulaModel[i][j] != null) {
            this.formulaModel[i][j].getTest();
          }
        }
      }
    }

    if (this.formulaModel !== undefined) {
      for (let i = 0; i < this.augmentFormulaModel.length; i++) {
        for (let j = 0; j < this.augmentFormulaModel.length; j++) {
          if (this.augmentFormulaModel[i][j] !== undefined && this.augmentFormulaModel[i][j] != null) {
            this.augmentFormulaModel[i][j].getTest();
          }
        }
      }
    }
  }


  setFinalCalulation(list: string[][], l, devicesCom) {

    this.getTestFromformula();


    const jsonObh = {};


    if (this._devices[l] !== undefined) {


      for (let j = 0; j < this._devices[l].length; j++) {

        jsonObh[this._devices[l][j].deviceName] = {
          [this._devices[l][j].deviceName]: {
            [this.curtail]: {
              device_topic: this.campus + '/' + this.building + '/' + this._devices[l][j].deviceName,
            }
          }
        };

        for (let k = 0; k < list[0].length; k++) {
          if (this.formulaModel !== undefined) {
            if (this.formulaModel[j][k] !== null) {

              jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this.curtail][list[l][k]] = {};
              if (this.formulaModel[j][k] !== undefined) {
                jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this.curtail][list[l][k]].operation
                  = this.formulaModel[j][k].getoperation;
                jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this.curtail][list[l][k]].minimum
                  = this.formulaModel[j][k].mini;
                jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this.curtail][list[l][k]].maximum
                  = this.formulaModel[j][k].maximun;
                jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this.curtail][list[l][k]].operation_args
                  = this.formulaModel[j][k].getoperatoin_args;
                jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this.curtail][list[l][k]]
                  .operation_type
                  = 'formula';
              }
            }
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

        if (this._showAugmentSection[j]) {

          jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment] = {
            device_topic: this.campus + '/' + this.building + '/' + this._devices[l][j].deviceName
          };
          for (let k = 0; k < list[0].length; k++) {

            if (this.augmentFormulaModel[j][k] !== null) {
              // jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment][list[l][k]]
              //   = this.augmentFormulaModel[j][k];

              jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment][list[l][k]] = {};
              if (this.augmentFormulaModel[j][k] !== undefined) {
                jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment][list[l][k]].operation
                  = this.augmentFormulaModel[j][k].getoperation;
                jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment][list[l][k]].minimum
                  = this.augmentFormulaModel[j][k].mini;
                jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment][list[l][k]].maximum
                  = this.augmentFormulaModel[j][k].maximun;
                jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment][list[l][k]].operation_args
                  = this.augmentFormulaModel[j][k].getoperatoin_args;
                jsonObh[this._devices[l][j].deviceName][this._devices[l][j].deviceName][this._augment][list[l][k]]
                  .operation_type
                  = 'formula';
              }
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
    }

    jsonObh[this.mapper] = {};
    jsonObh[this.mapper].zone_type = {};
    jsonObh[this.mapper].zone_type[this.privateOffice] = 1;
    jsonObh[this.mapper].zone_type.Office = 3;
    jsonObh[this.mapper].zone_type[this.conference] = 1;
    jsonObh[this.mapper].zone_type.Lobby = 9;
    jsonObh[this.mapper].zone_type.RestRoom = 9;


    const cal = JSON.stringify(jsonObh, null, 4).replace(/\\/g, '').replace('\"obj\": {', '').replace('\"augjson\": {}', '');

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
