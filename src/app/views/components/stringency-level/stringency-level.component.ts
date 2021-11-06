import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stringency-level',
  templateUrl: './stringency-level.component.html',
  styleUrls: ['./stringency-level.component.scss'],
})
export class StringencyLevelComponent implements OnInit {
  @Input('stringency') stringency: number;
  @Input('maxLevel') maxLevel: number;
  @Output() stringencyChange = new EventEmitter<number>();

  ctrl: FormControl;

  constructor() {}

  ngOnInit(): void {
    this.ctrl = new FormControl(null, Validators.required);
    this.ctrl.setValue(this.stringency);

    this.ctrl.valueChanges.subscribe((newValue) => {
      console.log(newValue);
      this.stringencyChange.emit(newValue);
    });
  }
}
