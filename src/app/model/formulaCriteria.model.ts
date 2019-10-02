export class FormulaCriteriaModel {

  // tslint:disable-next-line:variable-name
  private operation_args: string[] = [];
  private operation: string;
  private minimum: number;
  private maximum: number;
  // tslint:disable-next-line:variable-name
  private operation_type = 'formula';
  private _formulaCalculate: any;
  // private formula: {
  //   argument: string[],
  //   operation: string,
  //   minimum: number,
  //   maximum: number
  // }[] = [];


  get operationtype(): string {
    return this.operation_type;
  }

  set operationtype(value: string) {
    this.operation_type = value;
  }

  get getoperation_args(): string[] {
    return this.operation_args;
  }

  returnElement(i) {
    return this.operation_args[i];
  }
  set setoperation_args(value: string[]) {
    this.operation_args = value;
  }

  addArugiment() {
    console.log('inside add argument formula  model');
    this.operation_args.push('');
    console.log(this.operation_args.length);
  }

  print() {
    console.log(this.operation_args);
    console.log(this.maximum);
    console.log(this.minimum);
    console.log(this.operation);
  }

  get getoperation(): string {
    return this.operation;
  }

  set setoperation(value: string) {
    this.operation = value;
  }

  get mini(): number {
    return this.minimum;
  }

  set mini(value: number) {
    this.minimum = value;
  }

  get maximun(): number {
    return this.maximum;
  }

  set maximun(value: number) {
    this.maximum = value;
  }

  get formulaCalculate(): any {
    const obj = {
      operation: this.operation,
      operation_type: 'formula',
      operation_args: this.operation_args,
      minimum: this.minimum,
      maximum: this.maximum
    };
    this._formulaCalculate = obj;
    return this._formulaCalculate;
  }

  set formulaCalculate(value: any) {
    this._formulaCalculate = value;
  }
}

