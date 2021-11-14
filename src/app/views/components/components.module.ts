import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { SelectionModalComponent } from './selection-modal/selection-modal.component';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringencyLevelComponent } from './stringency-level/stringency-level.component';
import { ProgressLoaderComponent } from './progress-loader/progress-loader.component';
import { GroupFeatureSelectionComponent } from './group-feature-selection/group-feature-selection.component';

@NgModule({
  declarations: [
    DashboardCardComponent,
    SelectionModalComponent,
    StringencyLevelComponent,
    ProgressLoaderComponent,
    GroupFeatureSelectionComponent,
  ],
  exports: [
    DashboardCardComponent,
    SelectionModalComponent,
    StringencyLevelComponent,
    ProgressLoaderComponent,
    GroupFeatureSelectionComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ComponentsModule {}
