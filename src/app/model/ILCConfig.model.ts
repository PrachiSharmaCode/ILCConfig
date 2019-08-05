export class ILCCongig {

  private _calculation: string;
  /***ILC Configuration***/
  private _campus = 'Campus';
  private _building = 'Building';
  private _campusList: string[] = [];
  private _buildingList: string[] = [];
  private _device: string[] = [];
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
  private string: any;
  private _devicePoint: string[][] = [];
  private _devicesMasterList: {
    deviceTopic: string,
    devicePoints: {
      referenceName: string,
      volttronPointName: string,
    }[]
  }[];

  private _deviceAndPoint: {
    deviceName: string,
    devicePoints: string[],
    checked: boolean;
  }[] = [];

  /***CLUSTER***/
  private _cluster = [];

  /***ILCCONFIG CALCULATION***/
  private _finalCalcualtion: string;

  /***PAIRWISE***/
  private _pairwiseCriteriaList = ['zonetemperature', 'stage',
    'history-zonetemperature',
    'rated-power', 'room-type'];
  private _pairwiaseCalculation: string;
  private _pairwisecdriteria: Map<any, any>;

  /***CRITERIA***/
  private _devices = [];

  /*****GETTERS & SETTER*****/

  get devicesMasterList(): {
    deviceTopic: string,
    devicePoints: {
      referenceName: string,
      volttronPointName: string,
    }[]
  }[] {
    return this._devicesMasterList;
  }

  setMasterDriver(devices: {
    deviceTopic: string,
    devicePoints: {
      referenceName: string,
      volttronPointName: string,
    }[]
  }[]) {
    this.devicesMasterList = devices;

    let devicesLength = this.devicesMasterList.length - 1;

    while (devicesLength >= 0) {




      if (this.devicesMasterList[devicesLength] !== undefined) {
        let i = 0;
        let count = 0;
        let start = 0;
        let end: number;

        while (count <= 2) {

          if (this.devicesMasterList[devicesLength].deviceTopic.charAt(i) === '/') {
            count++;
            if (count === 1) {
              start = i;
            }
          }
          i++;
        }
        end = i;

        const str = this.devicesMasterList[devicesLength].deviceTopic.
        substring(end, this.devicesMasterList[devicesLength].deviceTopic.length);
        this._devices.push(str);
        // console.log(this.devicesMasterList[devicesLength].devicePoints[0].volttronPointName);
        const tempPoint: string[] = [];
        for (let j = this.devicesMasterList[devicesLength].devicePoints.length - 1; j >= 0; j--) {
          if (this.devicesMasterList[devicesLength].devicePoints[j] !== undefined) {
            console.log(j);
            tempPoint.push(this.devicesMasterList[devicesLength].devicePoints[j].volttronPointName);
          }
        }

        this._devicePoint.push(tempPoint);

        const temp: {
          deviceName: string,
          devicePoints: string[],
          checked: boolean
        } = { deviceName: str,
          devicePoints: tempPoint,
          checked: false
        };

        this._deviceAndPoint.push(temp);




        const campusBuidling = this.devicesMasterList[devicesLength].deviceTopic.substring(start + 1, end - 1);


        let campusbuidlingDetails: string[];
        campusbuidlingDetails = campusBuidling.split('/');

        if (!this._campusList.includes(campusbuidlingDetails[0])) {
          this._campusList.push(campusbuidlingDetails[0]);
        }

        if (!this._buildingList.includes(campusbuidlingDetails[1])) {
          this._buildingList.push(campusbuidlingDetails[1]);
        }
      }
      devicesLength--;
    }

    console.log('*******');

    console.log(this._devices);
    console.log(this._devicePoint);
    console.log(this._deviceAndPoint);
    console.log('*******');
    console.log(this.devicesMasterList);
  }


  // tslint:disable-next-line:adjacent-overload-signatures
  set devicesMasterList(value: {
    deviceTopic: string,
    devicePoints: {
      referenceName: string,
      volttronPointName: string,
    }[]
  }[]) {
    this._devicesMasterList = value;
  }

  updateDeviceAndPoints(value: { deviceName: string; devicePoints: string[]; checked: boolean}[]){
    this.deviceAndPoint = value;
  }

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

  get campusList(): string[] {
    return this._campusList;
  }

  set campusList(value: string[]) {
    this._campusList = value;
  }

  get buildingList(): string[] {
    return this._buildingList;
  }

  set buildingList(value: string[]) {
    this._buildingList = value;
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
    return this._cluster;
  }

  updateClusterList(listOfCluster) {
    this._cluster = listOfCluster;
  }

  get pairwiseCriteriaList(): string[] {
    return this._pairwiseCriteriaList;
  }

  set pairwiseCriteriaList(value: string[]) {
    this._pairwiseCriteriaList = value;
  }

  get pairwisecdriteria(): Map<any, any> {
    if (this._pairwisecdriteria === undefined) {
      let dummy = new Map();
      dummy.set('', '');
      return dummy;
    }
    return this._pairwisecdriteria;
  }

  setILCConfig(campus, building, device, point, demandFormula, demandFormulaArgs, agentId, demandLimit,
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
      cluster: this._cluster,
    };
    this._finalCalcualtion = JSON.stringify(obj, null, 4);
    return this._finalCalcualtion;
  }


  get device(): string[] {
    return this._device;
  }

  set device(value: string[]) {
    this._device = value;
  }

  get devices(): string[] {
    return this._devices;
  }

  set devices(value: string[]) {
    this._devices = value;
  }

  get deviceAndPoint(): { deviceName: string; devicePoints: string[]; checked: boolean }[] {
    return this._deviceAndPoint;
  }

  set deviceAndPoint(value: { deviceName: string; devicePoints: string[]; checked: boolean}[]) {
    this._deviceAndPoint = value;
  }

  constructor() {
  }
}
