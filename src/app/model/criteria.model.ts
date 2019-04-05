export class CriteriaModel {

  private _critriaList: string[];
  private _stageName: string;
  private _operationType: string[][];
  private _criteriaCalculation: string;

  /***Formula***/
  private _arguments: string[];
  private _operation: string;
  private _minimum: number;
  private _maximum: number;

  /***Status***/

  /***Mapper***/

  /***Constant***/

  /***History***/

  get arguments(): string[] {
    return this._arguments;
  }

  set arguments(value: string[]) {
    this._arguments = value;
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

  updateFormulaOpration(argument, operation, minimum, maximum){
    this._arguments =  argument;
    this._operation =  operation;
    this._minimum =  minimum;
    this._maximum =  maximum;
  }
}
