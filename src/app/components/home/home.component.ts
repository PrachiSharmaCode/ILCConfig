import {Component, OnInit} from '@angular/core';
import {ILCCongig} from '../../model/ILCConfig.model';
import {PairwiseModel} from '../../model/pairwise.model';
import {CriteriaModel} from '../../model/criteria.model';
import {MainModel} from '../../model/main.model';
import {CurtailmentModel} from '../../model/curtailment.model';
import {FormulaCriteriaModel} from '../../model/formulaCriteria.model';
import {StatusCriteriaModel} from '../../model/statusCriteria.model';
import {MapperCriteriaModel} from '../../model/mapperCriteria.model';
import {ConstantCriteriaModel} from '../../model/constantCriteria.model';
import {HistoryCriteriaModel} from '../../model/historyCriteria.model';
import {parse} from 'papaparse';

// tslint:disable-next-line:class-name
interface point {
  referenceName: string;
  volttronPointName: string;
}

// tslint:disable-next-line:class-name
interface device {
  deviceTopic: string;
  devicePoints: point[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ilc: ILCCongig = new ILCCongig();
  pairwise: PairwiseModel = new PairwiseModel();
  criteria: CriteriaModel = new CriteriaModel();
  mainModel: MainModel = new MainModel();
  formulaModel: FormulaCriteriaModel[][] = [];
  statusModel: StatusCriteriaModel[][] = [];
  mapperModel: MapperCriteriaModel[][] = [];
  constantModel: ConstantCriteriaModel[][] = [];
  historyModel: HistoryCriteriaModel[][] = [];
  curtailment: CurtailmentModel = new CurtailmentModel();
  ilcCongifOpen: boolean;
  pairwiseOpen: boolean;
  criteriaOPen: boolean;
  curtailmentOpen: boolean;
  homeOpen = true;
  showNavButtons = false;
  showDocumentation = false;
  showILC = true;
  showMasterdriver = false;
  masterFile: string;
  check: object;

  constructor() {
  }

  openIlcConfig() {
    this.ilcCongifOpen = true;
    this.pairwiseOpen = false;
    this.criteriaOPen = false;
    this.curtailmentOpen = false;
    this.homeOpen = false;
    this.showNavButtons = true;
  }

  openPairwise() {
    this.ilcCongifOpen = false;
    this.pairwiseOpen = true;
    this.criteriaOPen = false;
    this.curtailmentOpen = false;
    this.homeOpen = false;
    this.showNavButtons = true;
  }

  openCriteria() {
    this.ilcCongifOpen = false;
    this.pairwiseOpen = false;
    this.criteriaOPen = true;
    this.curtailmentOpen = false;
    this.homeOpen = false;
    this.showNavButtons = true;
  }

  openCurtailment() {
    this.ilcCongifOpen = false;
    this.pairwiseOpen = false;
    this.criteriaOPen = false;
    this.curtailmentOpen = true;
    this.homeOpen = false;
    this.showNavButtons = true;
  }

  openHome() {
    this.ilcCongifOpen = false;
    this.pairwiseOpen = false;
    this.criteriaOPen = false;
    this.curtailmentOpen = false;
    this.homeOpen = true;
  }

  openILC() {
    this.showDocumentation = false;
    this.showILC = true;
    this.showMasterdriver = false;
  }

  openDocumentation() {
    this.showDocumentation = true;
    this.showILC = false;
    this.showMasterdriver = false;
  }

  openMasterDriver() {
    this.showDocumentation = false;
    this.showILC = false;
    this.showMasterdriver = true;
  }

  getMasterDriver(e) {
    console.log(e.target.files);
    const reader = new FileReader();
    //  const reader = e.target.files;
    // tslint:disable-next-line:only-arrow-functions
    reader.onload = (e) => {
      const masterDriverConfig = JSON.parse(reader.result.toString());
      let device_names = Object.keys(masterDriverConfig).filter(key => !(key.endsWith('.csv')));
      let devices = device_names.map(device => {
        let deviceData = JSON.parse(parse(masterDriverConfig[device].data).data.join('\n'));
        if (deviceData.registry_config) {
          console.log(deviceData.registry_config);
          let registryConfigName = deviceData.registry_config.split('//')[1];
          let registryConfigData = parse(masterDriverConfig[registryConfigName].data).data;
          let registryConfigEntries = registryConfigData.slice(1).map(line => {
            if (line[0] && line[1]) {
              return {
                referenceName: line[0],
                volttronPointName: line[1]
              } as point;
            }
          });
          let deviceEntry = {
            deviceTopic: device,
            devicePoints: registryConfigEntries
          } as device;
          // console.log(deviceEntry);
          return deviceEntry;
        }
      });
      this.ilc.setMasterDriver(devices);
      this.openIlcConfig();
      return devices;
    };
    if (e.target.files !== undefined) {
      reader.readAsText(e.target.files[0]);
    }
  }

  activeSideBarButton(value) {
    let clickedButton;
    let button;
    button = document.getElementsByClassName('activeBar');
    button[0].className = button[0].className.replace('activeBar', '');
    clickedButton = document.getElementById(value.target.id);
    clickedButton.className += ' activeBar';
  }

  activeButton(value) {
    let clickedButton;
    let button;
    button = document.getElementsByClassName('active');
    button[0].className = button[0].className.replace('active', '');
    clickedButton = document.getElementById(value.target.id);
    clickedButton.className += ' active';
  }

  ngOnInit() {
  }

}
