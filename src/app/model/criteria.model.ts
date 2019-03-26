export class CriteriaModel{

  private _critriaList: string[];
  private _stageName: string;
  private _operation: string[];
  private _arguments: string[];
  private _criteriaCalculation: string;


  get stageName(): string {
    return this._stageName;
  }

  set stageName(value: string) {
    this._stageName = value;
  }

  get operation(): string[] {
    return ['', '', '', '', ''];
  }

  set operation(value: string[]) {
    this._operation = value;
  }

  get arguments(): string[] {
    return ['', '', '', '', ''];
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

  get criteriaCalculation(): string {
    return this._criteriaCalculation;
  }

  set criteriaCalculation(value: string) {
    this._criteriaCalculation = value;
  }
}
