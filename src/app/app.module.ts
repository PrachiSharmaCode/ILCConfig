import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { MDBBootstrapModule} from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ILCConfigComponent } from './components/ilcconfig/ilcconfig.component';
import { PairwiseComponent } from './components/pairwise/pairwise.component';
import { CriteriaConfigComponent } from './components/criteria-config/criteria-config.component';
import { CurtailmentConfigComponent } from './components/curtailment-config/curtailment-config.component';
import { HomeComponent } from './components/home/home.component';

import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClusterComponent } from './components/cluster/cluster.component';
import { FormulaCriteriaComponent} from './components/formula-criteria/formula-criteria.component';
import { StatusCriteriaComponent } from './components/status-criteria/status-criteria.component';
import { MapperCriteriaComponent } from './components/mapper-criteria/mapper-criteria.component';
import { HistoryCriteriaComponent } from './components/history-criteria/history-criteria.component';
import { ConstatntCriteriaComponent } from './components/constatnt-criteria/constatnt-criteria.component';


@NgModule({
  declarations: [
    AppComponent,
    ILCConfigComponent,
    PairwiseComponent,
    CriteriaConfigComponent,
    CurtailmentConfigComponent,
    HomeComponent,
    ClusterComponent,
    FormulaCriteriaComponent,
    StatusCriteriaComponent,
    MapperCriteriaComponent,
    HistoryCriteriaComponent,
    ConstatntCriteriaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSliderModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
