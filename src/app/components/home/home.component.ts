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
  masterFile: string;

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

  getMasterDriver(e) {
    const reader = new FileReader();
    //  const reader = e.target.files;
    // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
    reader.onload = () => {
      const masterDriverConfig = JSON.parse(reader.result.toString());
      // tslint:disable-next-line:variable-name
      const device_names = Object.keys(masterDriverConfig).filter(key => !(key.endsWith('.csv')));
      // tslint:disable-next-line:no-shadowed-variable
      const devices = device_names.map(device => {
        const deviceData = JSON.parse(parse(masterDriverConfig[device].data).data.join('\n'));
        if (deviceData.registry_config) {
          const registryConfigName = deviceData.registry_config.split('//')[1];
          const registryConfigData = parse(masterDriverConfig[registryConfigName].data).data;
          const registryConfigEntries = registryConfigData.slice(1).map(line => {
            if (line[0] && line[1]) {
              return {
                referenceName: line[0],
                volttronPointName: line[1]
              } as point;
            }
          });
          const deviceEntry = {
            deviceTopic: device,
            devicePoints: registryConfigEntries
          } as device;
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
