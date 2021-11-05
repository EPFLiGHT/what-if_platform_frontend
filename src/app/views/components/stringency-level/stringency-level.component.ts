import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stringency-level',
  templateUrl: './stringency-level.component.html',
  styleUrls: ['./stringency-level.component.scss']
})
export class StringencyLevelComponent implements OnInit {
  @Input("stringency") stringency;
  @Input("maxLevel") maxLevel;

  constructor() { }

  ngOnInit(): void {
  }

}
