import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReproductionRateComponent } from './reproduction-rate/reproduction-rate.component';
import { UnemploymentRateComponent } from './unemployment-rate/unemployment-rate.component';
import { ReinforcementLearningComponent } from './reinforcement-learning/reinforcement-learning.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    ReproductionRateComponent,
    UnemploymentRateComponent,
    ReinforcementLearningComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class PagesModule { }
