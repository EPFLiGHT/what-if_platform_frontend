import { FieldValidator } from './../../../model/field-validator.model';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { Feature } from './../../../model/feature.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-group-feature-selection',
  templateUrl: './group-feature-selection.component.html',
  styleUrls: ['./group-feature-selection.component.scss'],
})
export class GroupFeatureSelectionComponent implements OnInit {
  @Input() featuresGroup: Feature[];
  @Input() customValidators: FieldValidator[];

  @Output() groupValid = new EventEmitter<boolean>();
  @Output() featureChange = new EventEmitter<{
    featureName: string;
    updatedValue: number;
  }>();
  group: FormGroup;

  constructor() {}

  ngOnInit(): void {
    let formControls: { [key: string]: AbstractControl } =
      this.featuresGroup.reduce(
        (obj, item) =>
          Object.assign(obj, {
            [item.name]: new FormControl('', this.validators(item)),
          }),
        {}
      );

    this.group = new FormGroup(formControls);

    this.setValues();
  }

  private setValues() {
    this.featuresGroup.forEach((feature: Feature) => {
      this.getControl(feature.name).setValue(feature.value);
    });
  }

  public initGroup() {
    this.setValues();

    this.customValidators?.forEach((customValidator) => {
      this.group.setValidators(customValidator.validator);
    });

    this.group.statusChanges.subscribe((status) => {
      this.groupValid.emit(status == 'VALID');
    });
  }

  public getControl(name: string): AbstractControl {
    return this.group.get(name);
  }

  public validators(feature: Feature): ValidatorFn[] {
    return [
      Validators.required,
      Validators.min(feature.range[0]),
      Validators.max(feature.range[1]),
      Validators.pattern(/^-?(0|[1-9]\d*(\.\d+)?)$/),
    ];
  }

  public onChange(feature: Feature, event: any) {
    let value = event.target.value;

    this.featureChange.emit({
      featureName: feature.name,
      updatedValue: value,
    });
  }
}
