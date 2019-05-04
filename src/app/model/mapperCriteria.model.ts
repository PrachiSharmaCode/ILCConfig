export class MapperCriteriaModel{

  private _mapKey: string;
  private _distName: string;
  private _mapper: {
    mapKey: string,
    distName: string
  };

  print() {
   console.log(this._distName);
   console.log(this._mapKey);
  }

  get mapKey(): string {
    return this._mapKey;
  }

  set mapKey(value: string) {
    this._mapKey = value;
  }

  get distName(): string {
    return this._distName;
  }

  set distName(value: string) {
    this._distName = value;
  }

  get mapper(): { mapKey: string; distName: string } {
    return this._mapper;
  }

  set mapper(value: { mapKey: string; distName: string }) {
    this._mapper = value;
  }
}
