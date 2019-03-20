export class ILCCongig {

  private _calculation: string;
  /***ILC Configuration***/
  private _campus: string;
  private _building: string;
  private _device: string;
  private _point: string;
  private _demandFormula: string;
  private _demandFormulaArgs: string[];
  private _agentId: string;
  private _demandLimit: string;
  private _curtailmentTime: string;
  private _curtailmentConfirm: string;
  private _curtailmentBreak: string;
  private _buildingPowerWindow: string;
  private _staggerRelease: string;
  private _staggerOfftime: string;

  /***CLUSTER***/
  private _clusterList = [];

  /***ILCCONFIG CALCULATION***/
  private _finalCalcualtion: string;

  /***PAIRWISE***/
  private _pairwiseCriteriaList = ['zonetemperature', 'stage',
                                    'history-zonetemperature',
                                    'rated-power', 'room-type'];
  private _pairwiaseCalculation: string;
  private _pairwisecdriteria: Map<any, any>;

  /***CRITERIA***/
  private _devices = ['HP1', 'HP2', 'HP3'];
  private _curtailmentList = [];
  private _curtailmentCalculation: string;

  /*****GETTERS & SETTER*****/
  get campus(): string {
    return this._campus;
  }

  set campus(value: string) {
    this._campus = value;
  }

  get building(): string {
    return this._building;
  }

  set building(value: string) {
    this._building = value;
  }

  get device(): string {
    return this._device;
  }

  set device(value: string) {
    this._device = value;
  }

  get point(): string {
    return this._point;
  }

  set point(value: string) {
    this._point = value;
  }

  get demandFormula(): string {
    return this._demandFormula;
  }

  set demandFormula(value: string) {
    this._demandFormula = value;
  }

  get demandFormulaArgs(): string[] {
    this._demandFormulaArgs = [''];
    return this._demandFormulaArgs;
  }

  set demandFormulaArgs(value: string[]) {
    this._demandFormulaArgs = value;
  }

  get agentId(): string {
    return this._agentId;
  }

  set agentId(value: string) {
    this._agentId = value;
  }

  get demandLimit(): string {
    return this._demandLimit;
  }

  set demandLimit(value: string) {
    this._demandLimit = value;
  }

  get curtailmentTime(): string {
    return this._curtailmentTime;
  }

  set curtailmentTime(value: string) {
    this._curtailmentTime = value;
  }

  get curtailmentConfirm(): string {
    return this._curtailmentConfirm;
  }

  set curtailmentConfirm(value: string) {
    this._curtailmentConfirm = value;
  }

  get curtailmentBreak(): string {
    return this._curtailmentBreak;
  }

  set curtailmentBreak(value: string) {
    this._curtailmentBreak = value;
  }

  get buildingPowerWindow(): string {
    return this._buildingPowerWindow;
  }

  set buildingPowerWindow(value: string) {
    this._buildingPowerWindow = value;
  }

  get staggerRelease(): string {
    return this._staggerRelease;
  }

  set staggerRelease(value: string) {
    this._staggerRelease = value;
  }

  get staggerOfftime(): string {
    return this._staggerOfftime;
  }

  set staggerOfftime(value: string) {
    this._staggerOfftime = value;
  }

  get clusterList(): any[] {
    return this._clusterList;
  }

  get pairwiseCriteriaList(): string[] {
    return this._pairwiseCriteriaList;
  }

  set pairwiseCriteriaList(value: string[]) {
    this._pairwiseCriteriaList = value;
  }

  get pairwisecdriteria(): Map<any, any> {
    if(this._pairwisecdriteria === undefined) {
      let dummy = new Map();
      dummy.set('', '');
      return dummy;
    }
    return this._pairwisecdriteria;
  }

  set pairwisecdriteria(value: Map<any, any>) {
    this._pairwisecdriteria = value;
  }

  get pairwiaseCalculation(): string {
    if(this._pairwisecdriteria === undefined) {
      return '';
    }
    let obj = [];
    let num = 0;
    while (num < this._pairwiseCriteriaList.length) {
      let oobj = [];
      const mainCriteria = this._pairwiseCriteriaList[num];
      const hmap = this._pairwisecdriteria.get(mainCriteria);
      for (let i = num + 1; i < this._pairwiseCriteriaList.length; i++) {
        let followCriteria = '';
        let followCriteriaValue = '';
        followCriteria = this._pairwiseCriteriaList[i];
        followCriteriaValue = hmap.get(this._pairwiseCriteriaList[i]);
        let check = {};
        check = {[followCriteria]: followCriteriaValue};
        oobj.push(check);
      }
      obj.push({
        [mainCriteria]: {
          oobj
        }
      });
      num++;
    }
    this._pairwiaseCalculation = JSON.stringify(obj, null, 4)
      .replace('[', '').replace(']', '')
      .replace(/\"oobj\":/g, '');
    return this._pairwiaseCalculation;
  }

  set pairwiaseCalculation(value: string) {
    this._pairwiaseCalculation = value;
  }

  setILCConfig(campus, building , device, point, demandFormula, demandFormulaArgs, agentId, demandLimit,
               curtailmentTime, curtailmentConfim, curtailmentBreak, buildingPowerWindow, staggerRelease,
               staggerOfftime) {
    this._campus = campus;
    this._building = building;
    this._device = device;
    this._point = point;
    this._demandFormula = demandFormula;
    this._demandFormulaArgs = demandFormulaArgs;
    this._agentId = agentId;
    this._demandLimit = demandLimit;
    this._curtailmentTime = curtailmentTime;
    this._curtailmentConfirm = curtailmentConfim;
    this._curtailmentBreak = curtailmentBreak;
    this._buildingPowerWindow = buildingPowerWindow;
    this._staggerRelease = staggerRelease;
    this._staggerOfftime = staggerOfftime;
  }

  get finalCalcualtion(): string {
    const obj = {
      campus: this._campus,
      building: this._building,
      power_meter: {
        device: this._device,
        point: this._point,
        demand_formula: {
          operation: 'Abs' + [this._demandFormula],
          operation_args: this._demandFormulaArgs
        }
      },
      agent_id: this._agentId,
      demand_limit: this._demandLimit,
      curtailment_time: this._curtailmentTime,
      curtailment_confirm: this._curtailmentConfirm,
      curtailment_break: this._curtailmentBreak,
      average_building_power_window: this._buildingPowerWindow,
      stagger_release: this._staggerRelease,
      stagger_off_time: this._staggerOfftime,
      cluster: this._clusterList
    };
    this._finalCalcualtion = JSON.stringify(obj, null, 4);
    return this._finalCalcualtion;
  }

  get calculation(): string {
    this._calculation = this._finalCalcualtion + this._pairwiaseCalculation;
    return this._calculation;
  }

  set calculation(value: string) {
    this._calculation = value;
  }

  get devices(): string[] {
    return this._devices;
  }

  set devices(value: string[]) {
    this._devices = value;
  }

  get curtailmentList(): any[] {
    return this._curtailmentList;
  }

  print(){
    console.log('**********')
    console.log(this._curtailmentList);
  }

  set curtailmentList(value: any[]) {
    this._curtailmentList = value;
  }

  get curtailmentCalculation(): string {
    let obj = {};
    for (let i = 0; i < this.devices.length; i++) {
      obj[this.devices[i]] = this._curtailmentList[i];
    }
    this._curtailmentCalculation = JSON.stringify(obj, null, 4);
    return this._curtailmentCalculation;
  }

  set curtailmentCalculation(value: string) {
    this._curtailmentCalculation = value;
  }

  constructor() {}
}
