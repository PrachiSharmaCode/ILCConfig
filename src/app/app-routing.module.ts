import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ILCConfigComponent } from './components/ilcconfig/ilcconfig.component';
import { PairwiseComponent } from './components/pairwise/pairwise.component';
import { CriteriaConfigComponent } from './components/criteria-config/criteria-config.component';
import { CurtailmentConfigComponent } from './components/curtailment-config/curtailment-config.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'ILCConfiguration', component: ILCConfigComponent},
  {path: 'pairwiseConfiguration', component: PairwiseComponent},
  {path: 'criteriaConfiguration', component: CriteriaConfigComponent},
  {path: 'curtialmentConfiguration', component: CurtailmentConfigComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
