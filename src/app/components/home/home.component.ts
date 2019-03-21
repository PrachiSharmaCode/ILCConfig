import {Component, Input, OnInit, Output} from '@angular/core';
import {ILCCongig} from '../../model/ILCConfig.model';
import {PairwiseModel} from '../../model/pairwise.model';
import {EventEmitter} from 'events';
import {MainModel} from '../../model/main.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ilc: ILCCongig = new ILCCongig();
  pairwise: PairwiseModel = new PairwiseModel();
  mainModel: MainModel =  new MainModel();
  ilcCongifOpen: boolean;
  pairwiseOpen: boolean;
  criteriaOPen: boolean;
  curtailmentOpen: boolean;
  homeOpen = true;
  showNavButtons = false;
  showDocumentation = true;
  showILC = false;
  showMasterdriver = false;

  constructor() { }

  openIlcConfig() {
    this.ilcCongifOpen =  true;
    this.pairwiseOpen = false;
    this.criteriaOPen = false;
    this.curtailmentOpen = false;
    this.homeOpen = false;
    this.showNavButtons = true;
  }

  openPairwise() {
    this.ilcCongifOpen =  false;
    this.pairwiseOpen = true;
    this.criteriaOPen = false;
    this.curtailmentOpen = false;
    this.homeOpen = false;
    this.showNavButtons = true;
  }

  openCriteria() {
    this.ilcCongifOpen =  false;
    this.pairwiseOpen = false;
    this.criteriaOPen = true;
    this.curtailmentOpen = false;
    this.homeOpen = false;
    this.showNavButtons = true;
  }

  openCurtailment() {
    this.ilcCongifOpen =  false;
    this.pairwiseOpen = false;
    this.criteriaOPen = false;
    this.curtailmentOpen = true;
    this.homeOpen = false;
    this.showNavButtons = true;
  }

  openHome() {
    this.ilcCongifOpen =  false;
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

  ngOnInit() {
  }

}
