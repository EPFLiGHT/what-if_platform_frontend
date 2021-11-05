import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-feature-selection',
  templateUrl: './single-feature-selection.component.html',
  styleUrls: ['./single-feature-selection.component.scss'],
})
export class SingleFeatureSelectionComponent implements OnInit {
  @Input() featureName: string;
  @Input() defaultValue: number;

  @Input() minValue: number;
  @Input() maxValue: number;

  inputControl: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.inputControl = new FormControl('', [
      Validators.required,
      Validators.min(this.minValue),
      Validators.max(this.maxValue),
      Validators.pattern(/^-?(0|[1-9]\d*(\.\d+)?)$/)
    ]);

    this.inputControl.setValue(this.defaultValue)
  }
}
