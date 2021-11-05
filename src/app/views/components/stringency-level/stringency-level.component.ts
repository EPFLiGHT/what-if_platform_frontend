import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stringency-level',
  templateUrl: './stringency-level.component.html',
  styleUrls: ['./stringency-level.component.scss'],
})
export class StringencyLevelComponent implements OnInit {
  @Input('stringency') stringency;
  @Input('maxLevel') maxLevel;

  ctrl: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.ctrl = new FormControl(null, Validators.required);
    this.ctrl.setValue(this.stringency);
  }

  toKebabCase(str) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
}
