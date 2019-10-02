export class ConstantCriteriaModel {

  private value: number;
  // tslint:disable-next-line:variable-name
  private operation_type = 'constant';
  private _conatant: {
    value: number
  };


  get getoperation_type(): string {
    return this.operation_type;
  }

  set setoperation_type(value: string) {
    this.operation_type = value;
  }

  get getvalue(): number {
    return this.value;
  }

  set setvalue(value: number) {
    this.value = value;
  }

  get conatant(): { value: number } {
    return this._conatant;
  }

  set conatant(value: { value: number }) {
    this._conatant = value;
  }

  print() {
    console.log(this.value);
  }
}
