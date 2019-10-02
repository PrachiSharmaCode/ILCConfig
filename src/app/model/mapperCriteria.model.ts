export class MapperCriteriaModel {

  // tslint:disable-next-line:variable-name
  private map_key: string;
  // tslint:disable-next-line:variable-name
  private dist_name: string;
  // tslint:disable-next-line:variable-name
  private operation_type = 'mapper';

  private _mapper: {
    mapKey: string,
    distName: string
  };

  print() {
    console.log(this.dist_name);
    console.log(this.map_key);
  }

  get getoperation_type(): string {
    return this.operation_type;
  }

  set setoperation_type(value: string) {
    this.operation_type = value;
  }

  get getmap_key(): string {
    return this.map_key;
  }

  set setmap_key(value: string) {
    this.map_key = value;
  }

  get getdist_name(): string {
    return this.dist_name;
  }

  set setdist_name(value: string) {
    this.dist_name = value;
  }

  get mapper(): { mapKey: string; distName: string } {
    return this._mapper;
  }

  set mapper(value: { mapKey: string; distName: string }) {
    this._mapper = value;
  }
}
