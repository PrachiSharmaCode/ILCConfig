export class FormulaCriteriaModel {

  // tslint:disable-next-line:variable-name
  private ope_args: string[] = [];
  private operation: string;
  private minimum: number;
  private maximum: number;
  // tslint:disable-next-line:variable-name
  private operation_type = 'formula';
  private _formulaCalculate: any;
  private _operationArgsCheck: string[] = [];
  private operation_args: string = '';


  get getoperatoin_args(): string {
    return this.operation_args;
  }

  set getoperatoin_args(value: string) {
    this.operation_args = value;
  }

  get operationArgsCheck(): string[] {
    return this._operationArgsCheck;
  }

  set operationArgsCheck(value: string[]) {
    this._operationArgsCheck = value;
  }

  get operationtype(): string {
    return this.operation_type;
  }

  set operationtype(value: string) {
    this.operation_type = value;
  }

  get getoperation_args(): string[] {
    return this.ope_args;
  }

  returnElement(i) {
    return this.ope_args[i];
  }

  set setoperation_args(value: string[]) {
    this.ope_args = value;
  }

  getTest() {


    this.operation_args = '{';
    for (let i = 0; i < this.operationArgsCheck.length; i++) {
      if (this.operationArgsCheck[i] !== undefined
        && this.getoperation_args[i] !== undefined) {
        // this.test =  this.operationArgsCheck[i] + ':' + this.getoperation_args[i];

        this.operation_args = this.operation_args.concat('\"' + this.operationArgsCheck[i] + '\"' +
          ': [' + this.getoperation_args[i] + '],');
      }
    }
    this.operation_args = this.operation_args + '}';

    // if (this.operationArgsCheck[this.operationArgsCheck.length - 1] !== undefined
    //   && this.getoperation_args ![this.getoperation_args.length - 1] !== undefined) {
    //   // this.test =  this.operationArgsCheck[i] + ':' + this.getoperation_args[i];
    //
    //   this._test = this._test.concat(this.operationArgsCheck[this.operationArgsCheck.length - 1] +
    //     ':' + this.getoperation_args[this.getoperation_args.length - 1]);
    // }
  }


  addArugiment() {
    console.log('inside add argument formula  model');
    this.ope_args.push('');
    console.log(this.ope_args.length);
  }

  print() {
    console.log(this.ope_args);
    console.log(this.maximum);
    console.log(this.minimum);
    console.log(this.operation);
  }

  get getoperation(): string {
    return this.operation;
  }

  set getoperation(value: string) {
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
      operation_args: this.ope_args,
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

