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
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { ClusterComponent } from './components/cluster/cluster.component';
import { FormulaCriteriaComponent} from './components/formula-criteria/formula-criteria.component';
import { StatusCriteriaComponent } from './components/status-criteria/status-criteria.component';
import { MapperCriteriaComponent } from './components/mapper-criteria/mapper-criteria.component';
import { HistoryCriteriaComponent } from './components/history-criteria/history-criteria.component';

import { HttpClientModule} from '@angular/common/http';
import {OverlayModule} from '@angular/cdk/overlay';


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
    HistoryCriteriaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatSliderModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatSidenavModule,
    DragDropModule,
    MDBBootstrapModule.forRoot(),
    OverlayModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
