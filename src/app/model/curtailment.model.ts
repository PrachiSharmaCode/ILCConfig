import {ILCCongig} from './ILCConfig.model';

export class CurtailmentModel {

  private ilc: ILCCongig = new ILCCongig();
  private devices = this.ilc.devices;
  private _curtailmentList: {
    firstStageCooling: {
      deviceTopic: string,
      deviceStatus: {
        condition: string,
        deviceStageArgs: string
      }
    },
    curtailmentSetting: {
      point: string,
      curtailmentMethod: string,
      // @ts-ignore
      [this._curtailmentList.curtailmentSetting.curtailmentMethod]: string ;
    }
  }[];
  private _curtailmentCalculation: string;

  get curtailmentList(): any[] {
    return this._curtailmentList;
  }

  set curtailmentList(value: any[]) {
    this._curtailmentList = value;
  }

  updateCurtailmentList(value) {
    this._curtailmentList = value;
  }

  get curtailmentCalculation(): string {
    return this._curtailmentCalculation;
  }

  setFinalCalulation() {
    let obj = {};
    for (let i = 0; i < this.devices.length ; i++) {
      obj[this.devices[i]] = this._curtailmentList[i];
    }
    let cal = JSON.stringify(obj, null, 4).replace('[', '').replace(']', '');
    return cal;
  }

  set curtailmentCalculation(value: string) {
    this._curtailmentCalculation = value;
  }
}
