import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReproductionRateComponent } from './reproduction-rate/reproduction-rate.component';
import { UnemploymentRateComponent } from './unemployment-rate/unemployment-rate.component';
import { ReinforcementLearningComponent } from './reinforcement-learning/reinforcement-learning.component';
import { ComponentsModule } from '../components/components.module';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { FeaturesSelectionComponent } from './features-selection/features-selection.component';

@NgModule({
  declarations: [
    ReproductionRateComponent,
    UnemploymentRateComponent,
    ReinforcementLearningComponent,
    FeaturesSelectionComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ChartsModule,
    RouterModule
  ]
})
export class PagesModule { }
