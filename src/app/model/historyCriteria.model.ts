export class HistoryCriteriaModel {
  
  private _comparisonType: string;
  private _historyPointName: string;
  private _previousTime: string;
  private _historyMaximum: number;
  private _historyMinimum: number;
  
  private _history: {
    comparisonType: string,
    historyPointName: string,
    previousTime: string,
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

  get previousTime(): string {
    return this._previousTime;
  }

  set previousTime(value: string) {
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

  get history(): { comparisonType: string; historyPointName: string; previousTime: string; historyMaximum: number; historyMinimum: number } {
    return this._history;
  }

  set history(value: { comparisonType: string; historyPointName: string; previousTime: string; historyMaximum: number; historyMinimum: number }) {
    this._history = value;
  }

  print() {
    console.log(this._comparisonType);
    console.log(this._historyMaximum);
    console.log(this._historyMinimum);
    console.log(this._historyPointName);
    console.log(this._previousTime);
  }
}
