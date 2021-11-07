import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-loader',
  templateUrl: './progress-loader.component.html',
  styleUrls: ['./progress-loader.component.scss'],
})
export class ProgressLoaderComponent implements OnInit {
  @Input() message: string

  constructor() {}

  ngOnInit(): void {}
}
