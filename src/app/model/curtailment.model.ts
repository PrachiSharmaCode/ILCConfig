import {ILCCongig} from './ILCConfig.model';
import {CriteriaModel} from './criteria.model';

export class CurtailmentModel {

  private ilc: ILCCongig = new ILCCongig();
  private criteris: CriteriaModel = new CriteriaModel();

  private _campus: string;
  private _building: string;
  // private devices = this.ilc.devices;
  private _devices: {
    deviceName: string,
    devicePoints: string[],
  }[][] = [];
  private _curtailmentList: {
    device_topic: string,
    device_status: {
      curtail: {
        condition: string,
        device_status_args: string[]
      },
      augment: {
        condition: string,
        device_status_args: string[]
      }
    },
    curtail_setting: {
      point: string,
      control_method: string,
      // @ts-ignore
      offset: number;
      value: number;
      equation: number;
      // [this._curtailmentList.curtailmentSetting.control_method]: string;
      load: number
    }
    augment_setting: {
      point: string,
      control_method: string,
      // @ts-ignore
      offset: number;
      value: number;
      equation: number;
      // [this._curtailmentList.curtailmentSetting.control_method]: string;
      load: number
    }
  }[];
  private _curtailmentCalculation: string;

  private _augment: {
    condition: string,
    device_status_args: string
  }[] = [];

  private _augmentSetting: {
    point: string,
    control_method: string,
    // @ts-ignore
    [this.curtailmentSetting.control_method]: string;
  }[] = [];

  private _showAugmentSection: boolean[] = [];
  private _showAugmentSeetingSection: boolean[] = [];

  get curtailmentList(): any[] {
    return this._curtailmentList;
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

  get augment(): { condition: string; device_status_args: string } [] {
    return this._augment;
  }

  set augment(value: { condition: string; device_status_args: string } []) {
    this._augment = value;
  }

  get augmentSetting(): { point: string; control_method: string } [] {
    return this._augmentSetting;
  }

  set augmentSetting(value: { point: string; control_method: string } []) {
    this._augmentSetting = value;
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


  get showAugmentSection(): boolean[] {
    return this._showAugmentSection;
  }

  set showAugmentSection(value: boolean[]) {
    this._showAugmentSection = value;
  }

  get showAugmentSeetingSection(): boolean[] {
    return this._showAugmentSeetingSection;
  }

  set showAugmentSeetingSection(value: boolean[]) {
    this._showAugmentSeetingSection = value;
  }

  updateDevices(value: {
    deviceName: string,
    devicePoints: string[]
  }[][]) {
    this._devices = value;
  }


  setFinalCalulation() {
    let obj = {};
    for (let j = 0; j < this.devices.length; j++) {
      for (let i = 0; i < this.devices[j].length; i++) {
        if (this._curtailmentList[i].curtail_setting.control_method === 'offset') {
          delete this._curtailmentList[i].curtail_setting.value;
          delete this._curtailmentList[i].curtail_setting.equation;
        }

        if (this._curtailmentList[i].curtail_setting.control_method === 'value') {
          delete this._curtailmentList[i].curtail_setting.offset;
          delete this._curtailmentList[i].curtail_setting.equation;
        }

        if (this._curtailmentList[i].curtail_setting.control_method === 'equation') {
          delete this._curtailmentList[i].curtail_setting.value;
          delete this._curtailmentList[i].curtail_setting.offset;
        }

        if (this._showAugmentSeetingSection[i]) {
          if (this._curtailmentList[i].augment_setting.control_method === 'offset') {
            delete this._curtailmentList[i].augment_setting.value;
            delete this._curtailmentList[i].augment_setting.equation;
          }

          if (this._curtailmentList[i].augment_setting.control_method === 'value') {
            delete this._curtailmentList[i].augment_setting.offset;
            delete this._curtailmentList[i].augment_setting.equation;
          }

          if (this._curtailmentList[i].augment_setting.control_method === 'equation') {
            delete this._curtailmentList[i].augment_setting.value;
            delete this._curtailmentList[i].augment_setting.offset;
          }
        }


        if (!this._showAugmentSection[i]) {
          delete this._curtailmentList[i].device_status.augment;
        }

        if (!this._showAugmentSeetingSection[i]) {
          delete this._curtailmentList[i].augment_setting;
        }

        obj[this.devices[j][i].deviceName] = {};
        obj[this.devices[j][i].deviceName][this.devices[j][i].deviceName] = this._curtailmentList[i];
      }
    }
    let cal = JSON.stringify(obj, null, 4);
    return cal;
  }

  set curtailmentCalculation(value: string) {
    this._curtailmentCalculation = value;
  }


  get devices(): { deviceName: string; devicePoints: string[]; }[][] {
    return this._devices;
  }

  set devices(value: { deviceName: string; devicePoints: string[]; }[][]) {
    this._devices = value;
  }
}
