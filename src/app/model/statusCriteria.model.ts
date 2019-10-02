export class StatusCriteriaModel {

  // tslint:disable-next-line:variable-name
  private point_name: string;
  // tslint:disable-next-line:variable-name
  private on_value: number;
  // tslint:disable-next-line:variable-name
  private off_value: number;
  // tslint:disable-next-line:variable-name
  private operation_type = ' status';


  get getoperation_type(): string {
    return this.operation_type;
  }

  set setoperation_type(value: string) {
    this.operation_type = value;
  }

  get getpointName(): string {
    return this.point_name;
  }

  set setpointName(value: string) {
    this.point_name = value;
  }

  get getonValue(): number {
    return this.on_value;
  }

  set setonValue(value: number) {
    this.on_value = value;
  }

  get getoffValue(): number {
    return this.off_value;
  }

  set setoffValue(value: number) {
    this.off_value = value;
  }
}
