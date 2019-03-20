import { Component } from '@angular/core';
import {ILCCongig} from "./model/ILCConfig.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  ilc: ILCCongig = new ILCCongig();

  ilcCongifOpen: boolean;
  pairwiseOpen: boolean;
  criteriaOPen: boolean;
  curtailmentOpen: boolean;
  homeOpen = true;
  navbarShow: boolean;

  openIlcConfig() {
    this.ilcCongifOpen =  true;
    this.pairwiseOpen = false;
    this.criteriaOPen = false;
    this.curtailmentOpen = false;
    this.homeOpen = false;
  }

  openPairwise() {
    this.ilcCongifOpen =  false;
    this.pairwiseOpen = true;
    this.criteriaOPen = false;
    this.curtailmentOpen = false;
    this.homeOpen = false;
  }

  openCriteria() {
    this.ilcCongifOpen =  false;
    this.pairwiseOpen = false;
    this.criteriaOPen = true;
    this.curtailmentOpen = false;
    this.homeOpen = false;
  }

  openCurtailment() {
    this.ilcCongifOpen =  false;
    this.pairwiseOpen = false;
    this.criteriaOPen = false;
    this.curtailmentOpen = true;
    this.homeOpen = false;
  }

  openHome() {
    this.ilcCongifOpen =  false;
    this.pairwiseOpen = false;
    this.criteriaOPen = false;
    this.curtailmentOpen = false;
    this.navbarShow = false;
    this.homeOpen = true;
  }

}
