import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { SelectionModalComponent } from './selection-modal/selection-modal.component';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardCardComponent, 
    SelectionModalComponent],
  exports: [
    DashboardCardComponent, 
    SelectionModalComponent
  ],
  imports: [
    CommonModule, 
    NgbModule,
    NgSelectModule,
    FormsModule
  ],
})
export class ComponentsModule {}
