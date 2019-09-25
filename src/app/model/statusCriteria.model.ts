export class StatusCriteriaModel {

  private _pointName: string;
  private _onValue: number;
  private _offValue: number;

  get pointName(): string {
    return this._pointName;
  }

  set pointName(value: string) {
    this._pointName = value;
  }

  get onValue(): number {
    return this._onValue;
  }

  set onValue(value: number) {
    this._onValue = value;
  }

  get offValue(): number {
    return this._offValue;
  }

  set offValue(value: number) {
    this._offValue = value;
  }
}
