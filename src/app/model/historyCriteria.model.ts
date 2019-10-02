export class HistoryCriteriaModel {

  // tslint:disable-next-line:variable-name
  private comparison_type: string;
  // tslint:disable-next-line:variable-name
  private point_name: string;
  // tslint:disable-next-line:variable-name
  private previous_time: number;
  private maximum: number;
  private minimum: number;
  // tslint:disable-next-line:variable-name
  private operation_type = 'history';

  private _history: {
    comparison_type: string,
    point_name: string,
    previous_time: number,
    // @ts-ignore
    maximum: number,
    // @ts-ignore
    maximum: number,
  };


  get getcomparisonType(): string {
    return this.comparison_type;
  }

  set setcomparisonType(value: string) {
    this.comparison_type = value;
  }

  get gethistoryPointName(): string {
    return this.point_name;
  }

  set sethistoryPointName(value: string) {
    this.point_name = value;
  }

  get getpreviousTime(): number {
    return this.previous_time;
  }

  set setpreviousTime(value: number) {
    this.previous_time = value;
  }

  get gethistoryMaximum(): number {
    return this.maximum;
  }

  set sethistoryMaximum(value: number) {
    this.maximum = value;
  }

  get gethistoryMinimum(): number {
    return this.minimum;
  }

  set sethistoryMinimum(value: number) {
    this.minimum = value;
  }

  get gethistory(): {
    comparison_type: string,
    point_name: string,
    previous_time: number,
    // @ts-ignore
    maximum: number,
    // @ts-ignore
    maximum: number,
  } {
    return this._history;
  }

  set sethistory(value: {
    comparison_type: string,
    point_name: string,
    previous_time: number,
    // @ts-ignore
    maximum: number,
    // @ts-ignore
    maximum: number,
  }) {
    this._history = value;
  }
}
