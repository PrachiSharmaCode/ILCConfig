export class ConstantCriteriaModel{

  private _value: number;
  private _conatant: {
    value: number
  };

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get conatant(): { value: number } {
    return this._conatant;
  }

  set conatant(value: { value: number }) {
    this._conatant = value;
  }

  print() {
    console.log(this._value);
  }
}
