export class StatusCriteriaModel {

  private _pointName: string;
  private _onValue: number;
  private _offValue: number;
  private _status: {
    pointName: string,
    onValue: number,
    offValue: number
  }[] = [];

  print() {
    console.log(this._offValue)
    console.log(this._onValue);
    console.log(this._pointName);
  }

  get status(): { pointName: string; onValue: number; offValue: number }[] {
    return this._status;
  }

  set status(value: { pointName: string; onValue: number; offValue: number }[]) {
    this._status = value;
  }

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
