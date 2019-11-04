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
import {WrongFileAlertComponent} from '../wrong-file-alert/wrong-file-alert.component';
import {MatDialog} from '@angular/material/dialog';
import { throwError } from 'rxjs';


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
  showAlert = false;

  constructor(public dialog: MatDialog) {
    this.masterFile = "";
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
    this.masterFile = "";
    this.ilcCongifOpen = false;
    this.pairwiseOpen = false;
    this.criteriaOPen = false;
    this.curtailmentOpen = false;
    this.homeOpen = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WrongFileAlertComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  getMasterDriver(e) {
    const reader = new FileReader();
    // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
    reader.onload = () => {
    try {
      let json = (JSON.parse(reader.result.toString()));

      let masterDriverAgentConfig = JSON.parse(json.config.data);

      if (masterDriverAgentConfig){
        if (masterDriverAgentConfig.agentid) {
          this.ilc.agentId = masterDriverAgentConfig.agentid;
        }
      }
      if (masterDriverAgentConfig){
        delete json.config;
      }
      if (!masterDriverAgentConfig || !this.ilc.agentId){
        throwError("Provided master driver config is improperly formatted.")
      }
    
      let deviceTopics = Object.keys(json).filter(key => key.startsWith("devices"));
      let masterDevices: any[] = deviceTopics.map(topic => {
        let deviceMetadata = topic.split("/");
        if (deviceMetadata && deviceMetadata.length === 4 && deviceMetadata[0] === "devices"){
          let campus = deviceMetadata[1], building = deviceMetadata[2], deviceId= deviceMetadata[3];
          if (this.ilc.campusList.indexOf(campus) < 0){
            this.ilc.campusList.push(campus);
          }
          if (this.ilc.buildingList.indexOf(building) < 0){
            this.ilc.buildingList.push(building);
          }
          let deviceData = JSON.parse(json[topic].data);
          let registryConfigName = deviceData.registry_config.split('//')[1];
          let registryConfig = json[registryConfigName].data;
          let devicePoints = registryConfig.split("\n").slice(1, registryConfig.length).map(registryEntry => {
            if (registryEntry){
              let line = registryEntry.split(",");
              return {"referencePointName": line[0], "volttronPointName": line[1]}
            }
          }).filter(point => point);
          return {"deviceTopic": deviceId, "devicePoints": devicePoints};
        } else {
          throwError("Device topic " + topic + " is invalid, expected 'devices/<campus>/<building>/<deviceID>'");
        }
      });
      this.ilc.devicesMasterList = masterDevices;
      this.ilc.deviceAndPoint = masterDevices.map(device => {
        
        return {"deviceName": device.deviceTopic, "devicePoints": device["devicePoints"].map(point => point["volttronPointName"]), "checked": false};
      })
    } catch (e) {
      this.openDialog();
    }
    this.showAlert = false;
    this.openIlcConfig();
    }
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
    localStorage.setItem('key1', 'value1');
  }

}
