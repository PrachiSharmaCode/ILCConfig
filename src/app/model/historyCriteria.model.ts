export class HistoryCriteriaModel {
  
  private _comparisonType: string;
  private _historyPointName: string;
  private _previousTime: number;
  private _historyMaximum: number;
  private _historyMinimum: number;
  
  private _history: {
    comparisonType: string,
    historyPointName: string,
    previousTime: number,
    historyMaximum: number,
    historyMinimum: number,
  };


  get comparisonType(): string {
    return this._comparisonType;
  }

  set comparisonType(value: string) {
    this._comparisonType = value;
  }

  get historyPointName(): string {
    return this._historyPointName;
  }

  set historyPointName(value: string) {
    this._historyPointName = value;
  }

  get previousTime(): number {
    return this._previousTime;
  }

  set previousTime(value: number) {
    this._previousTime = value;
  }

  get historyMaximum(): number {
    return this._historyMaximum;
  }

  set historyMaximum(value: number) {
    this._historyMaximum = value;
  }

  get historyMinimum(): number {
    return this._historyMinimum;
  }

  set historyMinimum(value: number) {
    this._historyMinimum = value;
  }

  get history(): { comparisonType: string; historyPointName: string; previousTime: number; historyMaximum: number; historyMinimum: number } {
    return this._history;
  }

  set history(value: { comparisonType: string; historyPointName: string; previousTime: number; historyMaximum: number; historyMinimum: number }) {
    this._history = value;
  }
}
