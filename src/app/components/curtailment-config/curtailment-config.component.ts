import {Component, Input, OnInit} from '@angular/core';
import {ILCCongig} from '../../model/ILCConfig.model';
import * as FileSaver from 'file-saver';
import {CurtailmentModel} from '../../model/curtailment.model';
import {MainModel} from '../../model/main.model';
import {CriteriaModel} from '../../model/criteria.model';

@Component({
  selector: 'app-curtailment-config',
  templateUrl: './curtailment-config.component.html',
  styleUrls: ['./curtailment-config.component.css']
})
export class CurtailmentConfigComponent implements OnInit {

  @Input() ilc: ILCCongig;
  @Input() curtailment: CurtailmentModel;
  @Input() mainModel: MainModel;
  @Input() criteria: CriteriaModel;

  curtailmentModelList: CurtailmentModel[] = [];

  clusterList: {
    cluster_name: string;
    device_criteria_file: string;
    device_control_file: string;
    pairwise_criteria_file: string;
    cluster_priority: string
  }[];

  statusArgument = [];
  augmentStatusArgument = [];

  _augment: {
    condition: string,
    device_status_args: string[]
  }[] = [];

  _augmentSetting: {
    point: string,
    control_method: string,
    // @ts-ignore
    [this.curtailmentSetting.control_method]: string;
  }[] = [];

  deviceAndPoints: {
    deviceName: string,
    devicePoints: string[],
    checked: boolean
  }[][] = [];


  criteriaList: string[];
  devices: {
    deviceName: string,
    devicePoints: string[]
  }[][];

  campus: string;
  building: string;
  finalCalculation: string;

  curtailmentList: {
    device_topic: string,
    device_status: {
      curtail: {
        condition: string,
        device_status_args: string[]
      },
    },
    curtailmentSetting: {
      point: string,
      control_method: string,
      // @ts-ignore
      [this.curtailmentList.curtailmentSetting.control_method]: string;
    }
  }[] = [];

  constructor() {
  }

  // addOrRemove(id, e, d, k) {
  //
  //   console.log(id, k, d, e);
  //   console.log(this.deviceAndPoints);
  //
  //   if (e.target.checked) {
  //
  //     this.deviceAndPoints[d].checked = true;
  //
  //     const temp: {
  //       deviceName: string,
  //       devicePoints: string[],
  //     } = {
  //       deviceName: this.deviceAndPoints[d].deviceName,
  //       devicePoints: this.deviceAndPoints[d].devicePoints,
  //     };
  //
  //     if (this.devices === undefined) {
  //       this.devices = [];
  //     }
  //     this.devices.push(temp);
  //
  //     console.log(this.devices);
  //   } else {
  //     this.deviceAndPoints[d].checked = false;
  //     let count = 0;
  //
  //     for (let j = 0; j < this.devices.length; j++) {
  //       if (this.devices[j].deviceName === id) {
  //         this.devices.splice(j, 1);
  //         count = j;
  //         break;
  //       }
  //     }
  //   }
  // }

  addStatusArgument(i, index) {
    this.curtailmentModelList[i].curtailmentList[index].device_status.curtail.device_status_args.push('');
  }


  addEquatoinArgument(i, index) {
    this.curtailmentModelList[i].curtailmentList[index].curtail_setting.equation.equation_args.push('');
  }

  addAugmentEquatoinArgument(i, index) {
    this.curtailmentModelList[i].curtailmentList[index].augment_setting.equation.equation_args.push('');
  }

  addAugmentStatusArgument(i, index) {
    this.curtailmentModelList[i].curtailmentList[index].device_status.augment.device_status_args.push('');
  }

  // showAugmentSection(i, index) {
  //
  //   this.augmentStatusArgument = this.statusArgument;
  //   this.curtailmentModelList[i].showAugmentSection[index] = true;
  //
  //
  //   if (this.curtailmentModelList[i].curtailmentList[index].device_status.augment === undefined) {
  //     this.curtailmentModelList[i].curtailmentList[index].device_status.augment = {
  //       device_status_args: '',
  //       condition: ''
  //     };
  //   }
  //   this.curtailmentModelList[i].curtailmentList[index].device_status.augment.condition =
  //     this.curtailmentModelList[i].curtailmentList[index].device_status.curtail.condition;
  //
  //   for (let arg = 0; arg < this.curtailmentModelList[i].curtailmentList[index].device_status.curtail.device_status_args.length; arg++) {
  //     this.curtailmentModelList[i].curtailmentList[index].device_status.augment.device_status_args[arg] =
  //       this.curtailmentModelList[i].curtailmentList[index].device_status.curtail.device_status_args[arg];
  //   }
  //
  // }

  showAugmentSettingSection(i, index) {

    this.augmentStatusArgument = this.statusArgument;
    this.curtailmentModelList[i].showAugmentSection[index] = true;


    if (this.curtailmentModelList[i].curtailmentList[index].device_status.augment === undefined) {
      this.curtailmentModelList[i].curtailmentList[index].device_status.augment = {
        device_status_args: '',
        condition: ''
      };
    }
    this.curtailmentModelList[i].curtailmentList[index].device_status.augment.condition =
      this.curtailmentModelList[i].curtailmentList[index].device_status.curtail.condition;


    this.curtailmentModelList[i].curtailmentList[index].device_status.augment.device_status_args =
      this.curtailmentModelList[i].curtailmentList[index].device_status.curtail.device_status_args;


    this.curtailmentModelList[i].showAugmentSeetingSection[index] = true;
    console.log(i + this.curtailmentModelList[i].showAugmentSeetingSection[i]);
    if (this.curtailmentModelList[i].curtailmentList[index].augment_setting === undefined) {
      this.curtailmentModelList[i].curtailmentList[index].augment_setting = {
        control_method: '',
        point: '',
        offset: '',
        equation: '',
        value: '',
        load: '',
      };
    }
    this.curtailmentModelList[i].curtailmentList[index].augment_setting.control_method =
      this.curtailmentModelList[i].curtailmentList[index].curtail_setting.control_method;
    this.curtailmentModelList[i].curtailmentList[index].augment_setting.point =
      this.curtailmentModelList[i].curtailmentList[index].curtail_setting.point;
    this.curtailmentModelList[i].curtailmentList[index].augment_setting.offset =
      this.curtailmentModelList[i].curtailmentList[index].curtail_setting.offset;


    for (let e = 0; e < this.curtailmentModelList[i].curtailmentList[index].curtail_setting.equation.equation_args.length; e++) {
      this.curtailmentModelList[i].curtailmentList[index].augment_setting.equation.equation_args[e] =
        this.curtailmentModelList[i].curtailmentList[index].curtail_setting.equation.equation_args[e];
    }

    this.curtailmentModelList[i].curtailmentList[index].augment_setting.equation.operation =
      this.curtailmentModelList[i].curtailmentList[index].curtail_setting.equation.operation;

    this.curtailmentModelList[i].curtailmentList[index].augment_setting.equation.maximum =
      this.curtailmentModelList[i].curtailmentList[index].curtail_setting.equation.maximum;

    this.curtailmentModelList[i].curtailmentList[index].augment_setting.equation.minimum =
      this.curtailmentModelList[i].curtailmentList[index].curtail_setting.equation.minimum;

    this.curtailmentModelList[i].curtailmentList[index].augment_setting.value =
      this.curtailmentModelList[i].curtailmentList[index].curtail_setting.value;
    this.curtailmentModelList[i].curtailmentList[index].augment_setting.load =
      this.curtailmentModelList[i].curtailmentList[index].curtail_setting.load;
  }

  onRefreshButton(i) {
    // this.curtailmentModelList[i].updateCurtailmentList(this.curtailmentList);
    this.curtailmentModelList[i].updateDevices(this.devices);
    this.finalCalculation = this.curtailmentModelList[i].setFinalCalulation();
    console.log(this.finalCalculation);
  }

  saveCurtailmentCalculation(i) {
    const file = new Blob([this.curtailmentModelList[i].setFinalCalulation()],
      {type: 'json'});
    FileSaver.saveAs(file, this.clusterList[i].device_control_file + '.json');
  }

  ngOnInit() {
    this.clusterList = this.ilc.clusterList;
    this.curtailmentModelList = this.mainModel.curtailmentList;
    this.criteriaList = this.ilc.pairwiseCriteriaList;

    for (let i = 0; i < this.clusterList.length; i++) {
      this.deviceAndPoints[i] = this.ilc.deviceAndPoint;
    }
    this.devices = this.ilc.devices;
    console.log(this.devices);
    this.campus = this.ilc.campus;
    this.building = this.ilc.building;
    console.log(this.campus);
    console.log(this.building);
    for (let j = 0; j < this.curtailmentModelList.length; j++) {
      this.curtailmentModelList[j].campus = this.campus;
      this.curtailmentModelList[j].building = this.building;
      if (this.curtailmentModelList[j].curtailmentList === undefined) {
        this.curtailmentModelList[j].curtailmentList = [];
      }
      for (let i = 0; i < this.devices[j].length; i++) {
        if (this.curtailmentModelList[j].curtailmentList[i] === undefined) {
          this.curtailmentModelList[j].curtailmentList[i] = [];
          this.curtailmentModelList[j].curtailmentList[i] = {
            device_topic: this.campus + '/' + this.building + '/' + this.devices[j][i].deviceName,
            device_status: {
              curtail: {
                condition: '',
                device_status_args: ['']
              },
              augment: {
                condition: '',
                device_status_args: ['']
              },
            },
            curtail_setting: {
              point: '',
              control_method: '',
              equation: {
                equation_args: [''],
                operation: '',
                minimum: '',
                maximum: '',
              },
            },
            augment_setting: {
              point: '',
              control_method: '',
              equation: {
                equation_args: [''],
                operation: '',
                minimum: '',
                maximum: '',
              },
            }
          };
        }
      }
    }
    console.log(this.curtailmentModelList);
  }

  trackByIndex(index: number): any {
    return index;
  }

}
